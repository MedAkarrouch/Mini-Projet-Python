import pandas as pd
import numpy as np
from sklearn.impute import SimpleImputer
from imblearn.over_sampling import SMOTE
from sklearn.preprocessing import LabelEncoder

class Preprocess:

  def __init__(self,df,target_name,task,random_state=42):
    self.df = df
    self.random_state = random_state
    self.task = task
    self.target_name = target_name
    # Ensure the target column exists
    if self.task!="clustering" and self.target_name not in self.df.columns: 
      raise ValueError(f"Target column '{self.target_name}' not found in the dataset.")
    
    self.preprocess()
  
  def preprocess(self):
    self.drop_columns_with_height_missing_values()
    self.handle_missing_values()
    self.encode_features() 
    # self.remove_outliers()
    self.drop_duplicates()
    # self.balance_classes()
  
  def drop_duplicates(self):
    self.df = self.df.drop_duplicates()
  
  def drop_columns_with_height_missing_values(self):
    columns_to_drop = self.df.columns[self.df.isnull().mean()>0.5] 
    self.df = self.df.drop(columns=columns_to_drop)
  
  def handle_missing_values(self):
    #Replacing null values with Median (Numeric) 
    imputer_med = SimpleImputer(strategy='median')
    for col in self.df.select_dtypes(include='number').columns:
        if self.df[col].isnull().sum()>0:
            self.df[col] = imputer_med.fit_transform(self.df[[col]]).ravel()
    # for (Categories) Replace with MODE
    imputer_mode = SimpleImputer(strategy='most_frequent')
    for col in self.df.select_dtypes(exclude='number').columns:
        if self.df[col].isnull().sum()>0:
            self.df[col] = imputer_mode.fit_transform(self.df[[col]]).ravel()

  
  def encode_features(self):
    encoder = LabelEncoder()
    for col in self.df.columns:
      # if col == self.target_name:  # Skip the target column
      #     continue
      if col in self.df.select_dtypes(include=['number']).columns:
        continue
      # 
      self.df[col] = encoder.fit_transform(self.df[col])
  
  def remove_outliers(self):
    dff = self.df.copy()
    for col in self.df.columns:
        if col == self.target_name : continue
        Q1 = np.percentile(self.df[col],25) # 16.5 [10,23,50,60,90]  # [23,10,50,60,90] 
        Q3 = np.percentile(self.df[col],75) #75
        IQR = Q3 - Q1 # 58.5
        lower_bound = Q1 - 1.5 * IQR # 16.5 - 1.5*59.5
        upper_bound = Q3 + 1.5 * IQR # 75 +1.5*59.5
        dff= dff[ (dff[col]>=lower_bound) & (dff[col]<=upper_bound) ]
    self.df = dff
  
  def balance_classes(self):
    if self.task != 'classification' : return
    class_counts = self.df[self.target_name].value_counts()
    print(class_counts)
    if class_counts.min()== class_counts.max() : return
    
    smote = SMOTE(random_state=self.random_state)
    X_resampled, y_resampled = smote.fit_resample(
        self.df.drop(columns=[self.target_name]), self.df[self.target_name]
    )

    self.df = pd.DataFrame(X_resampled, columns=self.df.drop(columns=[self.target_name]).columns)
    self.df[self.target_name] = y_resampled
