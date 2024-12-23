from fastapi import  File, UploadFile
import os
from io import BytesIO
import seaborn as sns
import pandas as pd
from sklearn.datasets import load_iris,load_digits,load_wine,load_breast_cancer,load_diabetes,fetch_california_housing,fetch_covtype,fetch_20newsgroups_vectorized,load_linnerud
import seaborn as sns
import matplotlib.pyplot as plt

from datasets.schemas import VisualizationRequest
import base64
import io
import numpy as np


# Available datasets from scikit-learn and seaborn
available_datasets = {
    "scikit_learn": [
        "iris",
        "digits",
        "wine",
        "breast_cancer",
        "diabetes",
        "california_housing",
        "linnerud",
        "newsgroups",
        "covtype"
    ],
    "seaborn": ["iris", "tips", "titanic", "flights", "penguins", "diamonds"]
}
seaborn_targets = {
    "iris": "species",
    "tips": "tip",
    "titanic": "survived",
    "flights": "passengers",
    "penguins": "species",
    "diamonds": "price"
}
sklearn_custom_targets = {
    "iris": "species",
    "digits": "digit",
    "wine": "class",
    "breast_cancer": "label",
    "diabetes": "progression",
    "california_housing": "house_value",
    "linnerud": "fitness_measures",
    "newsgroups": "category",
    "covtype": "cover_type"
}
# Mapping for scikit-learn datasets to their loading functions
sklearn_datasets = {
    "iris": load_iris,
    "digits": load_digits,
    "wine": load_wine,
    "breast_cancer": load_breast_cancer,
    "diabetes": load_diabetes,
    "california_housing": fetch_california_housing,
    "linnerud": load_linnerud,
    "newsgroups": fetch_20newsgroups_vectorized,
    "covtype": fetch_covtype
}



class DatasetHelpers():
  def load_external_dataset(self,library,dataset):
    if library == "seaborn":
      return sns.load_dataset(dataset)
      # return sns_dataset.to_dict(orient="records")  # Convert to a list of dicts
    elif library == "scikit": 
      data = sklearn_datasets[dataset]()
      df = pd.DataFrame(data.data , columns=data.feature_names)
      df[sklearn_custom_targets[dataset]] = data.target
      return df
    
  async def read_file_as_df(self,file:UploadFile):
    # Read the uploaded file into a DataFrame based on the file type
    file_extension = file.filename.split('.')[-1].lower()

    # Use BytesIO to read the file content directly in memory
    file_content = BytesIO(file.file.read())
    # 
    try:
        # Determine the file type and load into a DataFrame
        if file_extension == 'csv':
            df = pd.read_csv(file_content)
        elif file_extension in ['xlsx']:
            df = pd.read_excel(file_content, engine='openpyxl')
        elif file_extension in ['xls']:
            df = pd.read_excel(file_content, engine='xlrd')
        elif file_extension == 'json':
            df = pd.read_json(file_content)
        elif file_extension == 'tsv':
            df = pd.read_csv(file_content, sep='\t')
        else:
            raise ValueError("Unsupported file type.")

        # retrn the df
        file_content.close()
        return df

    except Exception as e:
        file_content.close()
        raise ValueError(f"Error while processing file: {e}")

  
  async def save_file_as_csv(self,file: UploadFile, output_path: str):
    """
    Takes an uploaded file, reads it into a DataFrame, 
    and saves it as a CSV file at the given path.

    Args:
        file (UploadFile): The uploaded file.
        output_path (str): The path where the output CSV should be saved.
    """
    # Read the uploaded file into a DataFrame based on the file type
    file_extension = file.filename.split('.')[-1].lower()

    # Use BytesIO to read the file content directly in memory
    file_content = BytesIO(file.file.read())

    try:
        # Determine the file type and load into a DataFrame
        if file_extension == 'csv':
            df = pd.read_csv(file_content)
        elif file_extension in ['xlsx']:
            df = pd.read_excel(file_content, engine='openpyxl')
        elif file_extension in ['xls']:
            df = pd.read_excel(file_content, engine='xlrd')
        elif file_extension == 'json':
            df = pd.read_json(file_content)
        elif file_extension == 'tsv':
            df = pd.read_csv(file_content, sep='\t')
        else:
            raise ValueError("Unsupported file type.")

        # Save the DataFrame to CSV
        df.to_csv(os.path.join("uploaded_files",f"{output_path}.csv"), index=False)

    except Exception as e:
        raise ValueError(f"Error while processing file: {e}")
    finally:
        file_content.close()

  def replace_special_values(self,x):
    if pd.isna(x):
        return "NaN"
    elif x is True:
        return "True"
    elif x is False:
        return "False"
    return x
  
  def generate_plot(df: pd.DataFrame, params: VisualizationRequest) -> str:
     pass


  # def preprocess(self,dataset_   path : str, target_name : str , user_id : str):
  #   df =Preprocess(dataset_path,target_name)
  #   df.to_csv(f"p-{user_id}-{}",index=False)
  
  # def df_to_dict(self,df):
  #   return df.to_dict(orient="records")    