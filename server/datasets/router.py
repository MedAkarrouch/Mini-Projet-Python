
from sqlalchemy.inspection import inspect
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile,Request
import seaborn as sns
from fastapi.responses import JSONResponse
import pandas as pd
from sklearn.datasets import load_iris,load_breast_cancer,load_wine
from auth.dependencies import protect
from sqlalchemy.orm import Session
from database import get_db
from datasets.schemas import AddDataset, VisualizationRequest
from models import Dataset
from datasets.preprocess import Preprocess
from datasets.helpers import DatasetHelpers
from sqlalchemy import and_
import os
import matplotlib.pyplot as plt
import io
from pandas.api.types import is_numeric_dtype
import base64
import numpy as np

router = APIRouter()


@router.post("/visualize")
async def visualize(request : VisualizationRequest , user = Depends(protect),datasetHelpers : DatasetHelpers = Depends(DatasetHelpers)):
    try:
        # Convert the JSON dataset to a Pandas DataFrame
        df = pd.DataFrame(data=request.json["data"], columns=request.json["columns"])
        # Generate the plot
        image_base64 = datasetHelpers.generate_plot(df, request)
        return JSONResponse(content={"image": image_base64})

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)


def to_dict(model):
    """
    Convert an SQLAlchemy model instance to a dictionary.
    """
    return {column.key: getattr(model, column.key) for column in inspect(model).mapper.column_attrs}


# m_2d_d = {
#     "Line": lambda ax, data: ax.plot(data.x_values, data.y_values, label="Line Plot"),
#     "Scatter": lambda ax, data: ax.scatter(data.x_values, data.y_values, label="Scatter Plot"),
#     "Histogram 2D": lambda ax, data: ax.hist2d(data.x_values, data.y_values, bins=20, cmap="Blues"),
#     "Histogram 1D": lambda ax, data: ax.hist(data.x_values, bins=20, label="Histogram 1D"),
#     "Pie": lambda ax, data: ax.pie(data.x_values, labels=data.x_label, autopct="%1.1f%%"),
#     "Bar": lambda ax, data: ax.bar(data.x_values, data.y_values, label="Bar Plot"),
#     "Stacked Bar": lambda ax, data: ax.bar(data.x_values, data.y_values, label="Stacked Bar"),
#     "Box": lambda ax, data: ax.boxplot(data.y_values, vert=True, patch_artist=True),
#     "Violin": lambda ax, data: ax.violinplot(data.y_values),
#     "Heatmap": lambda ax, data: ax.imshow(data.matrix, cmap="coolwarm"),
#     "Area": lambda ax, data: ax.fill_between(data.x_values, data.y_values, label="Area Plot", alpha=0.5),
# }
# m_3d_d = {
#     "Line": lambda ax, data: ax.plot(data.x_values, data.y_values, data.z_values, label="3D Line Plot"),
#     "Scatter": lambda ax, data: ax.scatter(data.x_values, data.y_values, data.z_values, label="3D Scatter Plot"),
#     "Surface": lambda ax, data: ax.plot_surface(
#         data.x_values, data.y_values, data.z_values, cmap="viridis"
#     ),
#     "Wireframe": lambda ax, data: ax.plot_wireframe(
#         data.x_values, data.y_values, data.z_values, color="blue"
#     ),
#     "3D Bar": lambda ax, data: ax.bar3d(
#         data.x_values, data.y_values, data.z_values, data.dx, data.dy, data.dz
#     ),
#     "3D Contour": lambda ax, data: ax.contour3D(
#         data.x_values, data.y_values, data.z_values, cmap="viridis"
#     ),

# }
# s_2d_d = {
#     "Line": lambda data, df: sns.lineplot(x=data.x_label, y=data.y_label, data=df),
#     "Scatter": lambda data, df: sns.scatterplot(x=data.x_label, y=data.y_label, data=df),
#     "Bar": lambda data, df: sns.barplot(x=data.x_label, y=data.y_label, data=df),
#     "Count": lambda data, df: sns.countplot(x=data.x_label, data=df),  # Doesn't need y-axis
#     "Histogram": lambda data, df: sns.histplot(x=data.x_label, data=df, kde=True, bins=20),  # Doesn't need y-axis
#     "Box": lambda data, df: sns.boxplot(x=data.x_label, y=data.y_label, data=df),
#     "Violin": lambda data, df: sns.violinplot(x=data.x_label, y=data.y_label, data=df),
#     "Heatmap": lambda data, df: sns.heatmap(df.corr(), annot=True, cmap="coolwarm"),
#     "Pair": lambda data, df: sns.pairplot(df),  # Doesn't need x or y-axis explicitly
#     "Cat": lambda data, df: sns.catplot(x=data.x_label, y=data.y_label, kind="bar", data=df),
#     "Strip": lambda data, df: sns.stripplot(x=data.x_label, y=data.y_label, data=df),
#     "Swarm": lambda data, df: sns.swarmplot(x=data.x_label, y=data.y_label, data=df),
#     "KDE": lambda data, df: sns.kdeplot(x=data.x_label, data=df, fill=True),  # Doesn't need y-axis
#     "Rug": lambda data, df: sns.rugplot(x=data.x_label, data=df),  # Doesn't need y-axis
# }

# ############################################
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import io
import base64
from fastapi.responses import JSONResponse

# Updated dictionaries with consistent styles
m_2d_d = {
    "Line": lambda ax, data: ax.plot(
        data.x_values, data.y_values, label="Line Plot", lw=2, color="#1f77b4"
    ),
    "Scatter": lambda ax, data: ax.scatter(
        data.x_values, data.y_values, label="Scatter Plot", c="#ff7f0e", s=50
    ),
    "Histogram 2D": lambda ax, data: ax.hist2d(
        data.x_values, data.y_values, bins=20, cmap="viridis"
    ),
    "Histogram 1D": lambda ax, data: ax.hist(
        data.x_values, bins=20, label="Histogram 1D", color="#2ca02c", edgecolor="black"
    ),
    "Pie": lambda ax, data: ax.pie(
        data.x_values, labels=data.x_label, autopct="%1.1f%%", colors=sns.color_palette("viridis", n_colors=len(data.x_values))
    ),
    "Bar": lambda ax, data: ax.bar(
        data.x_values, data.y_values, label="Bar Plot", color="#9467bd"
    ),
    "Stacked Bar": lambda ax, data: ax.bar(
        data.x_values, data.y_values, label="Stacked Bar", color="#8c564b"
    ),
    "Box": lambda ax, data: ax.boxplot(
        data.x_values, vert=True, patch_artist=True, boxprops=dict(facecolor="#e377c2")
    ),
    "Violin": lambda ax, data: ax.violinplot(
        data.x_values, showmeans=True, showmedians=True
    ),
    "Heatmap": lambda ax, data: ax.imshow(
        data.matrix, cmap="viridis", aspect="auto"
    ),
    "Area": lambda ax, data: ax.fill_between(
        data.x_values, data.y_values, label="Area Plot", alpha=0.5, color="#17becf"
    ),
}

m_3d_d = {
    "Line": lambda ax, data: ax.plot(
        data.x_values, data.y_values, data.z_values, label="3D Line Plot", lw=2, color="#1f77b4"
    ),
    "Scatter": lambda ax, data: ax.scatter(
        data.x_values, data.y_values, data.z_values, label="3D Scatter Plot", c="#ff7f0e", s=50
    ),
    "Surface": lambda ax, data: ax.plot_surface(
        np.array(data.x_values), np.array(data.y_values), np.array(data.z_values).reshape(len(data.x_values), len(data.y_values)), cmap="viridis"
    ),
    "Wireframe": lambda ax, data: ax.plot_wireframe(
        np.array(data.x_values), np.array(data.y_values), np.array(data.z_values).reshape(len(data.x_values), len(data.y_values)), color="#1f77b4"
    ),
    "3D Bar": lambda ax, data: ax.bar3d(
        data.x_values, data.y_values, data.z_values, data.dx, data.dy, data.dz, color="#9467bd"
    ),
    "3D Contour": lambda ax, data: ax.contour3D(
        np.array(data.x_values), np.array(data.y_values), np.array(data.z_values).reshape(len(data.x_values), len(data.y_values)), cmap="viridis"
    ),
}

s_2d_d = {
    "Line": lambda data, df: sns.lineplot(
        x=data.x_label, y=data.y_label, data=df, linewidth=2, color="#1f77b4"
    ),
    "Scatter": lambda data, df: sns.scatterplot(
        x=data.x_label, y=data.y_label, data=df, color="#ff7f0e", s=50
    ),
    "Bar": lambda data, df: sns.barplot(
        x=data.x_label, y=data.y_label, data=df, palette="viridis"
    ),
    "Count": lambda data, df: sns.countplot(
        x=data.x_label, data=df, palette="viridis"
    ),
    "Histogram": lambda data, df: sns.histplot(
        x=data.x_label, data=df, kde=True, bins=20, color="#2ca02c"
    ),
    "Box": lambda data, df: sns.boxplot(
        x=data.x_label, y=data.y_label, data=df, palette="viridis"
    ),
    "Violin": lambda data, df: sns.violinplot(
        x=data.x_label, y=data.y_label, data=df, palette="viridis"
    ),
    "Heatmap": lambda data, df: sns.heatmap(
        df.corr(), annot=True, cmap="viridis"
    ),
    "Pair": lambda data, df: sns.pairplot(
        df, diag_kind="kde", palette="viridis"
    ),
    "Cat": lambda data, df: sns.catplot(
        x=data.x_label, y=data.y_label, kind="bar", data=df, palette="viridis"
    ),
    "Strip": lambda data, df: sns.stripplot(
        x=data.x_label, y=data.y_label, data=df, palette="viridis"
    ),
    "Swarm": lambda data, df: sns.swarmplot(
        x=data.x_label, y=data.y_label, data=df, palette="viridis"
    ),
    "KDE": lambda data, df: sns.kdeplot(
        x=data.x_label, data=df, fill=True, color="#17becf"
    ),
    "Rug": lambda data, df: sns.rugplot(
        x=data.x_label, data=df, height=0.1, color="#9467bd"
    ),
}

@router.post("/plot")
async def get_plot(data: VisualizationRequest):
    plt.figure(figsize=(8, 6))  # Standardize figure size
    sns.set_theme(style="whitegrid", palette="viridis")

    # Generate plot based on library and diagram type
    if data.library == "matplotlib":
        fig, ax = plt.subplots(subplot_kw={"projection": "3d"} if data.dimension == "3D" else None)

        if data.dimension == "2D":
            m_2d_d[data.diagram](ax, data)
        elif data.dimension == "3D":
            m_3d_d[data.diagram](ax, data)

    elif data.library == "seaborn":
        # Prepare a DataFrame for Seaborn plots
        data_dict = {data.x_label: data.x_values}
        if hasattr(data, "y_label") and data.y_label:
            data_dict[data.y_label] = data.y_values
        df = pd.DataFrame(data_dict)

        # Generate Seaborn plot
        s_2d_d[data.diagram](data, df)

    # Set axis labels and title
    if data.x_label:
        plt.xlabel(data.x_label, fontsize=12, fontweight="bold")
    if data.y_label:
        plt.ylabel(data.y_label, fontsize=12, fontweight="bold")
    if data.dimension == "3D" and hasattr(data, "z_label") and data.z_label:
        ax.set_zlabel(data.z_label, fontsize=12, fontweight="bold")

    plt.title("Feature Visualization", fontsize=16, fontweight="bold")
    plt.legend(loc="best", fontsize=10)

    # Save the figure to a buffer in PNG format
    buf = io.BytesIO()
    plt.savefig(buf, format="png", bbox_inches="tight", dpi=300)
    buf.seek(0)

    # Encode the image in base64
    base64_image = base64.b64encode(buf.read()).decode("utf-8")
    buf.close()
    plt.close()

    return JSONResponse(content={"image": base64_image})

# ####################


# @router.post("/plot")
# async def get_plot(data: VisualizationRequest):
    
#     plt.figure()  # Start a new figure
#     sns.set_theme(style="whitegrid")
#     sns.set_palette("muted") #muted
     
#     if data.library == "matplotlib":
#         # check dimentionality
#         if data.dimension == "2D":
#             # fig, ax = plt.subplots(figsize=(10,6))
#             fig, ax = plt.subplots()
#             m_2d_d[data.diagram](ax,data)

#         if data.dimension == "3D":
#             # fig, ax = plt.subplots(figsize=(10,6))
#             fig, ax = plt.subplots()
#             ax = fig.add_subplot(111,projection="3d")
#             m_3d_d[data.diagram](ax,data)

                
#         # ax.set_title("Sample Plot")
#         # ax.legend()

#     if data.library == "seaborn":
#         # sns.set(style="whitegrid")
#         # Prepare a pandas DataFrame
#         data_temp = {data.x_label : data.x_values}

#         if hasattr(data,"y_label") and data.y_label :
#             data_temp[data.y_label] = data.y_values

#         df = pd.DataFrame(data_temp)

#         # Create the Seaborn plot using both `data` and `df`
#         sns_plot = s_2d_d[data.diagram](data, df)
#      # set labels
#     if data.x_label:
#         plt.xlabel(data.x_label)
#     if data.y_label:
#         plt.ylabel(data.y_label)
#     if data.dimension == "3D" and data.z_label:
#         ax.set_zlabel(data.z_label)
    
#     plt.legend()
#     plt.title("Simple Plot")

#     # Save the figure to a buffer in PNG format
#     buf = io.BytesIO()
#     # plt.savefig(buf, format="png")
#     plt.savefig(buf, format="png", bbox_inches="tight", dpi=300) 
#     buf.seek(0)

#     # Encode the image in base64
#     base64_image = base64.b64encode(buf.read()).decode("utf-8")
#     buf.close()
#     plt.close()
#     return JSONResponse(content={"image" : base64_image})


@router.post("/")
async def upload_csv(
    request: Request,
    db: Session = Depends(get_db),
    user=Depends(protect),
    datasetHelpers: DatasetHelpers = Depends(DatasetHelpers),
):
    # Parse form-data
    form_data = await request.form()
    print("Form data received:", form_data)

    # Extract fields from the form-data
    name = form_data.get("name")
    target_name = form_data.get("target_name")
    external = form_data.get("external", "false").lower() == "true"
    external_library = form_data.get("external_library")
    external_library_dataset_name = form_data.get("external_library_dataset_name")
    file = form_data.get("file")  # Extract file from form-data
    task = form_data.get("task")

    # # check if the target_name exists in the file
    # if task!="clustering" and  not external :
    #     df = await datasetHelpers.read_file_as_df(file)
    #     print(df)
    #     if target_name not in df.columns:
    #         raise HTTPException(
    #             status_code=400,
    #             detail="Invalid target name"
    #         )
    

    # Create dataset object
    if not external:
        if task == "clustering":
            target_name = None
        
        created_dataset = Dataset(
            user_id=user.id,
            name=name,
            target_name=target_name,
            external=external,
            task=task
        )
    else:
        created_dataset = Dataset(
            user_id=user.id,
            name=name,
            target_name=target_name,
            external=external,
            external_library=external_library,
            external_library_dataset_name=external_library_dataset_name,
            task=task
        )
    
    db.add(created_dataset)
    db.commit()
    db.refresh(created_dataset)

    # Handle file saving if file is provided and dataset is not external
    if not external:
        if not file:
            raise HTTPException(status_code=400, detail="File is required for non-external datasets.")
        # Save the file
        await datasetHelpers.save_file_as_csv(file, created_dataset.id)

    # Return a success response
    return JSONResponse(status_code=201, content={"dataset_id": created_dataset.id})

@router.get("/dataset/{dataset_id}")
async def get_dataset(dataset_id: int, db: Session = Depends(get_db), user = Depends(protect),datasetHelpers : DatasetHelpers = Depends(DatasetHelpers)):
    # Query the database for the dataset with the given ID
    db_dataset = db.query(Dataset).filter(
        and_(Dataset.id == dataset_id, Dataset.user_id == user.id)
    ).first()


    if not db_dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")
    

    if db_dataset.external:
        o_df = datasetHelpers.load_external_dataset(db_dataset.external_library,db_dataset.external_library_dataset_name)
        # print(o_df.head(5))
        p = Preprocess(o_df,db_dataset.target_name,db_dataset.task)
        p_df = p.df
    elif not db_dataset.external:
        o_df = pd.read_csv(os.path.join("uploaded_files",f"{dataset_id}.csv"))
        p = Preprocess(o_df,db_dataset.target_name, db_dataset.task)
        p_df = p.df
    # Add stats
    o_db_stats = {
        "duplicates" : int(o_df.duplicated().sum()),
        "number_of_rows" : int(o_df.shape[0]),
        "number_of_columns" : int(o_df.shape[1]),
        "description" : o_df.describe().fillna(0).to_dict(orient="split"),
        "null_values" : int(o_df.isnull().sum().sum()),
        "correlation" : o_df.corr(numeric_only=True).fillna(0).to_dict(orient="split"),
    }

    p_db_stats = {
        "duplicates" : int(p_df.duplicated().sum()),
        "number_of_rows" : int(p_df.shape[0]),
        "number_of_columns" : int(p_df.shape[1]),
        "description" : p_df.describe().fillna(0).to_dict(orient="split"),
        "null_values" : int(p_df.isnull().sum().sum()),
        "correlation" : p_df.corr(numeric_only=True).fillna(0).to_dict(orient="split"),
    }
    #  
    return JSONResponse(
        status_code=200,
        # content = {"hello" : "hello"}
        content={
            "o_dataset" : o_df.applymap(datasetHelpers.replace_special_values).to_dict(orient="split"),
            "p_dataset" : p_df.to_dict(orient="split"),
            "task" : db_dataset.task,
            "target_name" : db_dataset.target_name,
            "name" : db_dataset.name,
            "stats" : {
                "o_dataset" : o_db_stats,
                "p_dataset" : p_db_stats
            }
        }
    ) 
# Get All Datasets

###
@router.get("/")
async def get_datasets(db: Session = Depends(get_db), user = Depends(protect)):
    # Query the database for the dataset with the given ID
    db_datasets = db.query(Dataset).filter(Dataset.user_id == user.id).all()
    datasets = [
        {
            "id": dataset.id,
            "name": dataset.name,
            "created_at": dataset.created_at.isoformat(),  # Convert datetime to string
            "user_id": dataset.user_id,
            "target_name" : dataset.target_name,
            "task" : dataset.task,
        }
        for dataset in db_datasets
    ]
    return JSONResponse(
        status_code=200,
        content={
            "datasets" : datasets
        }
# @router.get("/")
# async def get_datasets(db: Session = Depends(get_db), user = Depends(protect)):
#     # Query the database for the dataset with the given ID
#     db_datasets = db.query(Dataset).filter(Dataset.user_id == user.id).all()
#     datasets = [
#         {
#             "id": dataset.id,
#             "name": dataset.name,
#             # "created_at" : dataset.created_at
#             "target_name" : dataset.target_name,
#             "task" : dataset.task,
#             "external"  dataset.external, 
#             "external_library" : dataset.external_library,
#             "external_library_dataset_name" : ,
#             "created_at"  
#         }
#         for dataset in db_datasets
#     ]
#     return JSONResponse(
#         status_code=200,
#         content={
#             "datasets" : datasets
#         }
    ) 


@router.delete("/dataset/{dataset_id}")
async def delete_dataset(dataset_id: int,db: Session = Depends(get_db),user = Depends(protect)):
    # Query the database for the dataset with the given ID
    db_dataset = db.query(Dataset).filter(
        and_(Dataset.id == dataset_id, Dataset.user_id == user.id)
    ).first()

    if not db_dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")

    # Delete file
    if not db_dataset.external:
        file_path = os.path.join("uploaded_files",f"{db_dataset.id}.csv")
        if os.path.exists(file_path):
            os.remove(file_path)
    
    # Delete row
    db.delete(db_dataset)
    db.commit()
    return JSONResponse(status_code=204,content={})
        

# @router.get("/dataset/{dataset_id}")
# async def download_dataset(dataset_id: int,db: Session = Depends(get_db),user = Depends(protect)):
#     # Query the database for the dataset with the given ID
#     db_dataset = db.query(Dataset).filter(
#         and_(Dataset.id == dataset_id, Dataset.user_id == user.id)
#     ).first()

#     if not db_dataset:
#         raise HTTPException(status_code=404, detail="Dataset not found")

#     # 
#     if db_dataset 



# @router.get("/dataset/:dataset_id")
# def preprocess(user = Depends(protect)):
#     # Load the Iris dataset from scikit-learn
#     # data = sns.load_dataset("titanic")
#     data = load_iris()
    
#     # # Convert to a pandas DataFrame
#     df = pd.DataFrame(data.data, columns=data.feature_names)
#     df['target'] = data.target_names[data.target]
    
#     # Replace NaN values with a string "NaN"
#     # data = data.map(replace_special_values)

#     iris_json = df.to_dict(orient="split")
    
#     # Return JSON response
#     return JSONResponse(content={"data": iris_json})

# @router.get("/")
# def preprocess(user = Depends(protect)):
#     preprocess =Preprocess("titanic.csv","survived")
#     # Convert the DataFrame to JSON-compatible format
#     preprocessed_data = preprocess.df.to_dict(orient="records")    
#     # Return the preprocessed data as JSON
#     print(preprocessed_data)
#     return JSONResponse({"data": preprocessed_data})