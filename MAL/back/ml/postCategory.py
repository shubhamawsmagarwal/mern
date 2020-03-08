#Importing Libraries
import sys
import nltk
import re
import joblib
nltk.download('stopwords')

#Importing common stuffs
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

#Unpickling
dirName=sys.argv[3]
CountVectorizer=joblib.load(dirName+'/ml/applicationPickleFolder/CountVectorizerPickle.pkl')
Classifier=joblib.load(dirName+'/ml/applicationPickleFolder/classifierPickle.pkl')

#Application part
def getStringAsArray(string):
    ps=PorterStemmer()
    corpus=[]
    review=re.sub('[^a-zA-Z]',' ',string)
    review=review.lower()
    review=review.split()
    review=[ps.stem(word) for word in review if not word in set(stopwords.words('english'))]
    review=' '.join(review)
    corpus.append(review)
    x=CountVectorizer.transform(corpus).toarray()
    return x
   
    
def getCategoryNumber(string):
    string=string.lower()
    category=[]
    if string=="business":
        category.append(0)
    elif string=="entertainment":
        category.append(1)
    elif string=="health":
        category.append(2)
    elif string=="science":
        category.append(3)
    elif string=="sport":
        category.append(4)
    elif string=="world":
        category.append(5)
    return category


#calculating x and y
x=getStringAsArray(sys.argv[1])
y=getCategoryNumber(sys.argv[2])

#saving pickle classifier
Classifier.partial_fit(x,y)
joblib.dump(Classifier,dirName+'/ml/applicationPickleFolder/classifierPickle.pkl')

#Returning
print(y[0])
sys.stdout.flush()