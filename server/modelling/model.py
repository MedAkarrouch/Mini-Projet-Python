import numpy as np
from sklearn.cluster import KMeans, DBSCAN
from sklearn.neighbors import KNeighborsClassifier, KNeighborsRegressor
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.svm import SVR, SVC
from sklearn.naive_bayes import GaussianNB, BernoulliNB, MultinomialNB
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.neural_network import MLPClassifier, MLPRegressor
from sklearn.mixture import GaussianMixture
from sklearn.decomposition import PCA
from sklearn.preprocessing import label_binarize

import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler, StandardScaler
from sklearn.metrics import (
    RocCurveDisplay, accuracy_score, auc, confusion_matrix, precision_score,
    recall_score, f1_score, mean_squared_error, r2_score, mean_absolute_error, roc_curve,
    silhouette_score, silhouette_samples
)
import io
import base64

model_dict = {
    'Kmeans': KMeans,
    'K-Nearest Neighbors Classifier': KNeighborsClassifier,
    'K-Nearest Neighbors Regressor': KNeighborsRegressor,
    'Random Forest Classifier': RandomForestClassifier,
    'Random Forest Regressor': RandomForestRegressor,
    'Support Vector Regressor (SVR)': SVR,
    'Support Vector Classifier (SVC)': SVC,
    'Gaussian Naive Bayes': GaussianNB,
    'Bernoulli Naive Bayes': BernoulliNB,
    'Multinomial Naive Bayes': MultinomialNB,
    'Decision Tree Classifier': DecisionTreeClassifier,
    'Decision Tree Regressor': DecisionTreeRegressor,
    'Linear Regression': LinearRegression,
    'Logistic Regression': LogisticRegression,
    'Mlp Classifier': MLPClassifier,
    'Mlp Regressor': MLPRegressor,
}

scaling_required = {
    "minmax": ['Kmeans', 'Dbscan', 'Gaussian Mixture', 'Support Vector Regressor (SVR)', 'Support Vector Classifier (SVC)', 'Mlp Classifier', 'Mlp Regressor'],
    "standard": ['K-Nearest Neighbors Classifier', 'K-Nearest Neighbors Regressor', 'Linear Regression', 'Logistic Regression']
}

sns.set_theme(style="whitegrid", palette="muted")

class Model:

    def __init__(self, data, model_name, target_name, task, **args):
        if model_name not in model_dict.keys():
            raise ValueError(f"Model '{model_name}' is not recognized. Available models are: {', '.join(model_dict.keys())}")

        training_size = args.pop('training_size', 0.8)

        self.task = task
        self.model_name = model_name
        self.model = model_dict[model_name](**args)
        self.metrics = {}
        self.visualizations = {}

        self.df = pd.DataFrame(data["data"], columns=data["columns"])

        if task != "clustering":
            X = self.df.drop(columns=[target_name])
            y = self.df[target_name]
            self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
                X, y, train_size=training_size, random_state=42, shuffle=True,
                stratify=y if task == "classification" else None
            )
            scaler = None
            if model_name in scaling_required["minmax"]:
                scaler = MinMaxScaler()
            elif model_name in scaling_required["standard"]:
                scaler = StandardScaler()

            if scaler is not None:
                self.X_train = scaler.fit_transform(self.X_train)
                self.X_test = scaler.transform(self.X_test)
        else:
            self.X = np.array(data["data"])

        self.fit()
        self.predict()
        self.calc_metrics()
        self.visualize_metrics()

    def fit(self):
        if self.task == "clustering":
            self.model.fit(self.X)
        else:
            self.model.fit(self.X_train, self.y_train)

    def predict(self):
        if self.task == "clustering":
            if hasattr(self.model, 'labels_'):
                self.y_pred = self.model.labels_
        else:
            self.y_pred = self.model.predict(self.X_test)

    def calc_metrics(self):
        if self.task == "classification":
            self.metrics["accuracy_score"] = accuracy_score(self.y_pred, self.y_test)
            self.metrics["precision"] = precision_score(self.y_pred, self.y_test, average="weighted")
            self.metrics["recall"] = recall_score(self.y_pred, self.y_test, average="weighted")
            self.metrics["f1_score"] = f1_score(self.y_pred, self.y_test, average="weighted")
        elif self.task == "regression":
            self.metrics["r2_score"] = r2_score(self.y_pred, self.y_test)
            self.metrics["mean_absolute_error"] = mean_absolute_error(self.y_pred, self.y_test)
            self.metrics["mean_squared_error"] = mean_squared_error(self.y_pred, self.y_test)
            self.metrics["root_mean_squared_error"] = np.sqrt(mean_squared_error(self.y_pred, self.y_test))
        elif self.task == "clustering":
            self.metrics["silhouette_score"] = silhouette_score(self.X, self.y_pred)

    def _encode_plot(self):
        buf = io.BytesIO()
        plt.savefig(buf, format='png', bbox_inches="tight", dpi=300)
        buf.seek(0)
        plot_data = base64.b64encode(buf.read()).decode('utf-8')
        buf.close()
        plt.close()
        return plot_data

    def visualize_metrics(self):
        palette = sns.color_palette("viridis", as_cmap=False)
        if self.task == "classification":
            plt.figure(figsize=(8, 6))
            labels = ["Accuracy", "F1 Score", "Precision", "Recall"]
            values = [
                self.metrics["accuracy_score"],
                self.metrics["f1_score"],
                self.metrics["precision"],
                self.metrics["recall"]
            ]
            ax = sns.barplot(x=labels, y=values, palette=palette)
            for index, value in enumerate(values):
                ax.text(index, value + 0.02, f"{value:.2f}", ha="center", fontsize=12, weight="bold")
            # plt.title("Classification Metrics", fontsize=16, fontweight="bold")
            plt.ylabel("Score", fontsize=12)
            plt.ylim(0, 1.1)
            # self.visualizations["Metrics Bar"] = self._encode_plot()
            self.visualizations["Metrics Bar"] = (
              self._encode_plot(),
              "This bar chart shows the performance of the model using various metrics: Accuracy, F1 Score, Precision, and Recall."
            )

            # Confusion Matrix
            cm = confusion_matrix(self.y_test, self.y_pred)
            plt.figure(figsize=(8, 6))
            sns.heatmap(
                cm, annot=True, fmt="d", cmap="viridis", cbar=True,
                xticklabels=np.unique(self.y_test), yticklabels=np.unique(self.y_test),
                annot_kws={"size": 12, "weight": "bold"}
            )
            # plt.title("Confusion Matrix", fontsize=16, fontweight="bold")
            plt.ylabel("Actual", fontsize=12)
            plt.xlabel("Predicted", fontsize=12)
            # self.visualizations["Confusion Matrix"] = self._encode_plot()
            self.visualizations["Confusion Matrix"] = (
              self._encode_plot(),
              "The confusion matrix shows the actual versus predicted classifications, helping to understand where the model makes errors."
            )


            # ROC Curve
            if hasattr(self.model, "predict_proba"):
                plt.figure(figsize=(8, 6))
                if len(np.unique(self.y_test)) == 2:  # Binary classification
                    fpr, tpr, _ = roc_curve(self.y_test, self.model.predict_proba(self.X_test)[:, 1])
                    roc_auc = auc(fpr, tpr)
                    plt.plot(fpr, tpr, color="purple", lw=2, label=f"ROC Curve (AUC = {roc_auc:.2f})")
                    plt.plot([0, 1], [0, 1], color="gray", linestyle="--")
                    # plt.title("ROC Curve", fontsize=16, fontweight="bold")
                    plt.xlabel("False Positive Rate", fontsize=12)
                    plt.ylabel("True Positive Rate", fontsize=12)
                    plt.legend(loc="lower right")
                else:  # Multi-class classification
                    y_test_bin = label_binarize(self.y_test, classes=np.unique(self.y_test))
                    n_classes = y_test_bin.shape[1]

                    plt.figure(figsize=(10, 8))
                    for i in range(n_classes):
                        fpr, tpr, _ = roc_curve(y_test_bin[:, i], self.model.predict_proba(self.X_test)[:, i])
                        roc_auc = auc(fpr, tpr)
                        plt.plot(fpr, tpr, lw=2, label=f"Class {i} (AUC = {roc_auc:.2f})")

                    plt.plot([0, 1], [0, 1], color="gray", linestyle="--")
                    # plt.title("ROC Curve (Multi-Class)", fontsize=16, fontweight="bold")
                    plt.xlabel("False Positive Rate", fontsize=12)
                    plt.ylabel("True Positive Rate", fontsize=12)
                    plt.legend(loc="lower right", fontsize=10)
                # self.visualizations["ROC Curve"] = self._encode_plot()
                self.visualizations["ROC Curve"] = (
                    self._encode_plot(),
                    "The ROC curve shows the trade-off between true positive rate and false positive rate at various thresholds."
                )

        elif self.task == "regression":
            plt.figure(figsize=(8, 6))
            labels = ["R2 Score","MAE","MSE","RMSE"]
            values = list(self.metrics.values())

            sns.barplot(x=labels, y=values, palette=palette)
            # plt.title("Regression Metrics", fontsize=16, fontweight="bold")
            plt.ylabel("Value", fontsize=12)
            # plt.xticks(rotation=45)
            # self.visualizations["Metrics Bar"] = self._encode_plot()
            self.visualizations["Metrics Bar"] = (
              self._encode_plot(),
              "This bar chart provides metrics that evaluate the regression model, such as R-squared, Mean Squared Error, and Mean Absolute Error."
            ) 

            # Predicted vs Actual Plot
            plt.figure(figsize=(8, 6))
            plt.scatter(self.y_test, self.y_pred, color="purple", alpha=0.6, edgecolor="k")
            plt.plot([self.y_test.min(), self.y_test.max()], [self.y_test.min(), self.y_test.max()], '--k', lw=2)
            # plt.title("Predicted vs Actual", fontsize=16, fontweight="bold")
            plt.xlabel("Actual Values", fontsize=12)
            plt.ylabel("Predicted Values", fontsize=12)
            plt.grid(alpha=0.5)
            # self.visualizations["Predicted vs Actual"] = self._encode_plot()
            self.visualizations["Predicted vs Actual"] = (
              self._encode_plot(),
              "This scatter plot compares the model's predicted values to the actual values. A perfect prediction lies on the diagonal line."
            )

            # Residuals Histogram
            residuals = self.y_test - self.y_pred
            plt.figure(figsize=(8, 6))
            sns.histplot(residuals, bins=30, kde=True, color="teal", alpha=0.7)
            # plt.title("Residuals Distribution", fontsize=16, fontweight="bold")
            plt.xlabel("Residuals", fontsize=12)
            plt.ylabel("Frequency", fontsize=12)
            plt.grid(alpha=0.5)
            # self.visualizations["Residuals Histogram"] = self._encode_plot()
            self.visualizations["Residuals Distribution"] = (
              self._encode_plot(),
              "This histogram shows the distribution of residuals (prediction errors). Ideally, residuals should center around zero."
            )

        elif self.task == "clustering":
            if self.X.shape[1] > 2:
                pca = PCA(n_components=2)
                reduced_X = pca.fit_transform(self.X)
            else:
                reduced_X = self.X

            # Clustering Visualization
            plt.figure(figsize=(8, 6))
            scatter = plt.scatter(
                reduced_X[:, 0], reduced_X[:, 1], c=self.y_pred, cmap="viridis", s=50, edgecolor="k"
            )
            plt.colorbar(scatter, label="Cluster")
            # plt.title("KMeans Clustering Visualization", fontsize=16, fontweight="bold")
            plt.xlabel("Component 1", fontsize=12)
            plt.ylabel("Component 2", fontsize=12)
            # self.visualizations["Clustering"] = self._encode_plot()
            self.visualizations["Clustering Result"] = (
              self._encode_plot(),
              "This plot visualizes the clustering results in a 2D space. Each color represents a cluster."
            ) 





# import numpy as np
# from sklearn.cluster import KMeans,DBSCAN
# from sklearn.neighbors import KNeighborsClassifier,KNeighborsRegressor
# from sklearn.ensemble import RandomForestClassifier,RandomForestRegressor
# from sklearn.svm import SVR,SVC
# from sklearn.naive_bayes import GaussianNB,BernoulliNB,MultinomialNB
# from sklearn.tree import DecisionTreeClassifier,DecisionTreeRegressor
# from sklearn.linear_model import LinearRegression,LogisticRegression
# from sklearn.neural_network import MLPClassifier,MLPRegressor
# from sklearn.mixture import GaussianMixture

# import seaborn as sns
# import matplotlib.pyplot as plt
# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.preprocessing import MinMaxScaler,StandardScaler
# from sklearn.metrics import RocCurveDisplay, accuracy_score, auc, confusion_matrix,precision_score,recall_score,f1_score,mean_squared_error,r2_score,mean_absolute_error, roc_curve,silhouette_score,root_mean_squared_error
# import io
# import base64


# model_dict = {
#   'Kmeans': KMeans,
#   'K-Nearest Neighbors Classifier': KNeighborsClassifier,
#   'K-Nearest Neighbors Regressor': KNeighborsRegressor,
#   'Random Forest Classifier': RandomForestClassifier,
#   'Random Forest Regressor': RandomForestRegressor,
#   'Support Vector Regressor (SVR)': SVR,
#   'Support Vector Classifier (SVC)': SVC,
#   'Gaussian Naive Bayes': GaussianNB,
#   'Bernoulli Naive Bayes': BernoulliNB,
#   'Multinomial Naive Bayes': MultinomialNB,
#   'Decision Tree Classifier': DecisionTreeClassifier,
#   'Decision Tree Regressor': DecisionTreeRegressor,
#   'Linear Regression': LinearRegression,
#   'Logistic Regression': LogisticRegression,
#   'Mlp Classifier': MLPClassifier,
#   'Mlp Regressor': MLPRegressor,
# }

# scaling_requierd  = {
#   "minmax": ['Kmeans','Dbscan','Gaussian Mixture','Support Vector Regressor (SVR)','Support Vector Classifier (SVC)','Mlp Classifier','Mlp Regressor'],
#   "standard" : ['K-Nearest Neighbors Classifier','K-Nearest Neighbors Regressor','Linear Regression','Logistic Regression']
# }


# class Model:

#   def __init__(self,data,model_name,target_name,task,**args):
#     if model_name not in model_dict.keys():
#       raise ValueError(f"Model '{model_name}' is not recognized. Available models are: {', '.join(model_dict.keys())}")

#     # Extract training size and remove it from args
#     training_size = args.pop('training_size', 0.8)

#     self.task = task
#     self.model_name = model_name
#     self.model = model_dict[model_name](**args)
#     self.metrics = {}
#     self.visualizations = {}
    
    
#     self.df = pd.DataFrame(data["data"],columns=data["columns"])

#     if task!="clustering":
#       X = self.df.drop(columns=[target_name])
#       y = self.df[target_name]
#       # Split data
#       self.X_train,self.X_test,self.y_train,self.y_test = train_test_split(X,y,train_size=training_size,random_state=42,shuffle=True,stratify= y if task == "classification" else None)
#       # Determine Data
#       if model_name in scaling_requierd["minmax"]:
#         scaler = MinMaxScaler()
#       elif model_name in scaling_requierd["standard"]:
#         scaler = StandardScaler()
#       else:
#         scaler = None
#       # Scale Data
#       if scaler is not None:
#         self.X_train = scaler.fit_transform(self.X_train)
#         self.X_test = scaler.transform(self.X_test)
    
#     else:
#       self.X = data["data"]
#     # 
#     # sns.set_theme(style="whitegrid")
#     # sns.set_palette("muted") #muted
#     # 
#     self.fit()
#     self.predict()
#     self.calc_metrics()
#     self.visualize_metrics()
    

#   def fit(self):
#     if self.task == "clustering":
#       self.model.fit(self.X)
#     else:
#       self.model.fit(self.X_train,self.y_train)

#   def predict(self):
#     if self.task == "clustering":
#       if hasattr(self.model , 'labels_'): # Kmeans 
#         self.y_pred = self.model.labels_
#     else:
#       self.y_pred = self.model.predict(self.X_test)
  
#   def calc_metrics(self):
#     if self.task == "classification":
#       self.metrics["accuracy_score"] = accuracy_score(self.y_pred,self.y_test)
#       self.metrics["precision"] = precision_score(self.y_pred,self.y_test,average="weighted")
#       self.metrics["recall"] = recall_score(self.y_pred,self.y_test,average="weighted")
#       self.metrics["f1_score"] = f1_score(self.y_pred,self.y_test,average="weighted")
#     elif self.task == "regression":
#       self.metrics["r2_score"] = r2_score(self.y_pred,self.y_test)
#       self.metrics["mean_absolute_error"] = mean_absolute_error(self.y_pred,self.y_test) 
#       self.metrics["mean_squared_error"] =  mean_squared_error(self.y_pred,self.y_test)
#       self.metrics["root_mean_squared_error"] = root_mean_squared_error(self.y_pred,self.y_test)
#     elif self.task == "clustering":
#       self.metrics["silhouette_score"] = silhouette_score(self.X, self.y_pred)
 
#   def _encode_plot(self):
#     buf = io.BytesIO()
#     plt.savefig(buf, format='png',bbox_inches="tight", dpi=300)
#     buf.seek(0)
#     plot_data = base64.b64encode(buf.read()).decode('utf-8')
#     buf.close()
#     plt.close()
#     return plot_data

#   def visualize_metrics(self):
#     if self.task == "classification":
#         # 1. Bar Chart for Metrics
#         plt.figure()  # Start a new figure
#         labels = ["Accuracy", "F1 Score", "Precision", "Recall"]
#         values = [
#             self.metrics["accuracy_score"],
#             self.metrics["f1_score"],
#             self.metrics["precision"],
#             self.metrics["recall"],
#         ]
#         ax = sns.barplot(x=labels, y=values, palette="pastel")
#         for index, value in enumerate(values):
#             ax.text(index, value + 0.02, f"{value:.2f}", ha="center", fontsize=12, weight="bold")
#         plt.title("Classification Metrics", fontsize=20, fontweight="bold")
#         plt.ylabel("Score", fontsize=14)
#         plt.xlabel("Metrics", fontsize=14)
#         plt.ylim(0, 1.1)
#         plt.xticks(fontsize=12)
#         plt.yticks(fontsize=12)
#         plt.grid(axis="y", linestyle="--", alpha=0.5)
#         plt.tight_layout()
#         self.visualizations["Metrics Bar"] = self._encode_plot()

#         # 2. ROC Curve (Only for models that support predict_proba)
#         if hasattr(self.model, "predict_proba"):  # Check if the model has the predict_proba method
#             if len(np.unique(self.y_test)) == 2:  # Binary Classification
#                 plt.figure()
#                 fpr, tpr, _ = roc_curve(self.y_test, self.model.predict_proba(self.X_test)[:, 1])
#                 roc_auc = auc(fpr, tpr)
#                 plt.plot(fpr, tpr, color="#5bc0de", lw=3, label=f"ROC Curve (AUC = {roc_auc:.2f})")
#                 plt.plot([0, 1], [0, 1], color="gray", lw=2, linestyle="--")
#                 plt.title("Receiver Operating Characteristic (ROC)", fontsize=20, fontweight="bold")
#                 plt.xlabel("False Positive Rate", fontsize=14)
#                 plt.ylabel("True Positive Rate", fontsize=14)
#                 plt.legend(loc="lower right", fontsize=12)
#                 plt.grid(alpha=0.5)
#                 plt.tight_layout()
#                 self.visualizations["ROC Curve"] = self._encode_plot()
#             else:  # Multi-class ROC
#                 plt.figure()
#                 RocCurveDisplay.from_estimator(self.model, self.X_test, self.y_test)
#                 plt.title("ROC Curve (Multi-Class)", fontsize=20, fontweight="bold")
#                 plt.grid(alpha=0.5)
#                 plt.tight_layout()
#                 self.visualizations["ROC Curve"] = self._encode_plot()
#         else:
#             # For models that do not support predict_proba, you could plot a decision function or skip the ROC curve
#             if hasattr(self.model, "decision_function"):
#                 # If the model has a decision_function, use it instead of predict_proba
#                 plt.figure()
#                 decision_function = self.model.decision_function(self.X_test)
#                 plt.plot(decision_function, color="#FF6347")
#                 plt.title("Decision Function", fontsize=20, fontweight="bold")
#                 plt.xlabel("Samples", fontsize=14)
#                 plt.ylabel("Decision Function Value", fontsize=14)
#                 plt.grid(alpha=0.5)
#                 plt.tight_layout()
#                 self.visualizations["Decision Function"] = self._encode_plot()
#             else:
#                 print(f"Model '{self.model_name}' does not support ROC Curve or Decision Function plotting.")

#         # 3. Confusion Matrix
#         cm = confusion_matrix(self.y_test, self.y_pred)
#         plt.figure(figsize=(10, 6))
#         sns.heatmap(
#             cm,
#             annot=True,
#             fmt="d",
#             cmap="coolwarm",  # Light and pleasant colormap
#             cbar=True,
#             xticklabels=np.unique(self.y_test),
#             yticklabels=np.unique(self.y_test),
#             annot_kws={"size": 14, "weight": "bold"},
#         )
#         plt.title("Confusion Matrix", fontsize=20, fontweight="bold")
#         plt.ylabel("Actual", fontsize=14)
#         plt.xlabel("Predicted", fontsize=14)
#         plt.xticks(fontsize=12)
#         plt.yticks(fontsize=12)
#         plt.tight_layout()
#         self.visualizations["Confusion Matrix"] = self._encode_plot()

#     elif self.task == "regression":
#         # 1. Metrics Bar Chart
#         plt.figure()
#         labels = list(self.metrics.keys())
#         values = list(self.metrics.values())

#         sns.barplot(x=labels, y=values, palette="muted")
#         for index, value in enumerate(values):
#             plt.text(index, value + 0.02, f"{value:.2f}", ha="center", fontsize=12, weight="bold")
#         plt.title("Regression Metrics", fontsize=20, fontweight="bold")
#         plt.ylabel("Value", fontsize=14)
#         plt.xlabel("Metrics", fontsize=14)
#         plt.xticks(fontsize=12, rotation=45)
#         plt.yticks(fontsize=12)
#         plt.grid(axis="y", linestyle="--", alpha=0.5)
#         plt.tight_layout()
#         self.visualizations["Metrics Bar"] = self._encode_plot()

#         # 2. Prediction vs. Actual Scatter Plot
#         plt.figure()
#         plt.scatter(self.y_test, self.y_pred, color="#0072B2", alpha=0.6, edgecolors="w", s=50)
#         plt.plot([self.y_test.min(), self.y_test.max()], [self.y_test.min(), self.y_test.max()], '--k', lw=2)
#         plt.title("Predicted vs. Actual", fontsize=20, fontweight="bold")
#         plt.xlabel("Actual Values", fontsize=14)
#         plt.ylabel("Predicted Values", fontsize=14)
#         plt.grid(alpha=0.5)
#         plt.tight_layout()
#         self.visualizations["Predicted VS Actual"] = self._encode_plot()

#         # 3. Residuals Distribution Plot
#         residuals = self.y_test - self.y_pred
#         plt.figure()
#         sns.histplot(residuals, kde=True, bins=30, color="#D55E00", alpha=0.7)
#         plt.title("Residuals Distribution", fontsize=20, fontweight="bold")
#         plt.xlabel("Residuals", fontsize=14)
#         plt.ylabel("Frequency", fontsize=14)
#         plt.grid(alpha=0.5)
#         plt.tight_layout()
#         self.visualizations["Residuals Distribution"] = self._encode_plot()

#         # 4. Residuals vs. Predicted Values Scatter Plot
#         plt.figure()
#         plt.scatter(self.y_pred, residuals, color="#009E73", alpha=0.6, edgecolors="w", s=50)
#         plt.axhline(0, color="k", linestyle="--", lw=2)
#         plt.title("Residuals vs. Predicted", fontsize=20, fontweight="bold")
#         plt.xlabel("Predicted Values", fontsize=14)
#         plt.ylabel("Residuals", fontsize=14)
#         plt.grid(alpha=0.5)
#         plt.tight_layout()
#         self.visualizations["Residuals VS Predicted"] = self._encode_plot()


#   def visualize_metrics_v1(self):
#     if self.task == "classification":
#         # 1. Bar Chart for Metrics
#         plt.figure()  # Start a new figure
#         labels = ["Accuracy", "F1 Score", "Precision", "Recall"]
#         values = [
#             self.metrics["accuracy_score"],
#             self.metrics["f1_score"],
#             self.metrics["precision"],
#             self.metrics["recall"],
#         ]
#         ax = sns.barplot(x=labels, y=values, palette="pastel")
#         for index, value in enumerate(values):
#             ax.text(index, value + 0.02, f"{value:.2f}", ha="center", fontsize=12, weight="bold")
#         plt.title("Classification Metrics", fontsize=20, fontweight="bold")
#         plt.ylabel("Score", fontsize=14)
#         plt.xlabel("Metrics", fontsize=14)
#         plt.ylim(0, 1.1)
#         plt.xticks(fontsize=12)
#         plt.yticks(fontsize=12)
#         plt.grid(axis="y", linestyle="--", alpha=0.5)
#         plt.tight_layout()
#         self.visualizations["Metrics Bar"] = self._encode_plot()

#         # 2. ROC Curve
#         if len(np.unique(self.y_test)) == 2:  # Binary Classification
#             plt.figure()
#             fpr, tpr, _ = roc_curve(self.y_test, self.model.predict_proba(self.X_test)[:, 1])
#             roc_auc = auc(fpr, tpr)
#             plt.figure(figsize=(10, 6))
#             plt.plot(fpr, tpr, color="#5bc0de", lw=3, label=f"ROC Curve (AUC = {roc_auc:.2f})")
#             plt.plot([0, 1], [0, 1], color="gray", lw=2, linestyle="--")
#             plt.title("Receiver Operating Characteristic (ROC)", fontsize=20, fontweight="bold")
#             plt.xlabel("False Positive Rate", fontsize=14)
#             plt.ylabel("True Positive Rate", fontsize=14)
#             plt.legend(loc="lower right", fontsize=12)
#             plt.grid(alpha=0.5)
#             plt.tight_layout()
#             self.visualizations["ROC Curve"] = self._encode_plot()
#         else:  # Multi-class ROC
#             plt.figure()
#             RocCurveDisplay.from_estimator(self.model, self.X_test, self.y_test)
#             plt.title("ROC Curve (Multi-Class)", fontsize=20, fontweight="bold")
#             plt.grid(alpha=0.5)
#             plt.tight_layout()
#             self.visualizations["ROC Curve"] = self._encode_plot()

#         # 3. Confusion Matrix
#         cm = confusion_matrix(self.y_test, self.y_pred)
#         plt.figure(figsize=(10, 6))
#         sns.heatmap(
#             cm,
#             annot=True,
#             fmt="d",
#             cmap="coolwarm",  # Light and pleasant colormap
#             cbar=True,
#             xticklabels=np.unique(self.y_test),
#             yticklabels=np.unique(self.y_test),
#             annot_kws={"size": 14, "weight": "bold"},
#         )
#         plt.title("Confusion Matrix", fontsize=20, fontweight="bold")
#         plt.ylabel("Actual", fontsize=14)
#         plt.xlabel("Predicted", fontsize=14)
#         plt.xticks(fontsize=12)
#         plt.yticks(fontsize=12)
#         plt.tight_layout()
#         self.visualizations["Confusion Matrix"] = self._encode_plot()

#     elif self.task == "regression":
#         # 1. Metrics Bar Chart
#         plt.figure()
#         labels = list(self.metrics.keys())
#         values = list(self.metrics.values())

#         sns.barplot(x=labels, y=values, palette="muted")
#         for index, value in enumerate(values):
#             plt.text(index, value + 0.02, f"{value:.2f}", ha="center", fontsize=12, weight="bold")
#         plt.title("Regression Metrics", fontsize=20, fontweight="bold")
#         plt.ylabel("Value", fontsize=14)
#         plt.xlabel("Metrics", fontsize=14)
#         plt.xticks(fontsize=12, rotation=45)
#         plt.yticks(fontsize=12)
#         plt.grid(axis="y", linestyle="--", alpha=0.5)
#         plt.tight_layout()
#         self.visualizations["Metrics Bar"] = self._encode_plot()

#         # 2. Prediction vs. Actual Scatter Plot
#         plt.figure()
#         plt.scatter(self.y_test, self.y_pred, color="#0072B2", alpha=0.6, edgecolors="w", s=50)
#         plt.plot([self.y_test.min(), self.y_test.max()], [self.y_test.min(), self.y_test.max()], '--k', lw=2)
#         plt.title("Predicted vs. Actual", fontsize=20, fontweight="bold")
#         plt.xlabel("Actual Values", fontsize=14)
#         plt.ylabel("Predicted Values", fontsize=14)
#         plt.grid(alpha=0.5)
#         plt.tight_layout()
#         self.visualizations["Predicted VS Actual"] = self._encode_plot()

#         # 3. Residuals Distribution Plot
#         residuals = self.y_test - self.y_pred
#         plt.figure()
#         sns.histplot(residuals, kde=True, bins=30, color="#D55E00", alpha=0.7)
#         plt.title("Residuals Distribution", fontsize=20, fontweight="bold")
#         plt.xlabel("Residuals", fontsize=14)
#         plt.ylabel("Frequency", fontsize=14)
#         plt.grid(alpha=0.5)
#         plt.tight_layout()
#         self.visualizations["Residuals Distribution"] = self._encode_plot()

#         # 4. Residuals vs. Predicted Values Scatter Plot
#         plt.figure()
#         plt.scatter(self.y_pred, residuals, color="#009E73", alpha=0.6, edgecolors="w", s=50)
#         plt.axhline(0, color="k", linestyle="--", lw=2)
#         plt.title("Residuals vs. Predicted", fontsize=20, fontweight="bold")
#         plt.xlabel("Predicted Values", fontsize=14)
#         plt.ylabel("Residuals", fontsize=14)
#         plt.grid(alpha=0.5)
#         plt.tight_layout()
#         self.visualizations["Residuals VS Predicted"] = self._encode_plot()

