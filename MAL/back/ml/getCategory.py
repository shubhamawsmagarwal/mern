# Importing Libraries
import sys
import nltk
import re
import joblib
nltk.download('stopwords')

#Importing common stuffs
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

#Unpickling
dirName=sys.argv[2]
CountVectorizer=joblib.load(dirName+'/ml/PickleFolder/CountVectorizerPickle.pkl')
Classifier=joblib.load(dirName+'/ml/PickleFolder/classifierPickle.pkl')

#Application part
def predictCategory(string):
    ps=PorterStemmer()
    corpus=[]
    review=re.sub('[^a-zA-Z]',' ',string)
    review=review.lower()
    review=review.split()
    review=[ps.stem(word) for word in review if not word in set(stopwords.words('english'))]
    review=' '.join(review)
    corpus.append(review)
    x=CountVectorizer.transform(corpus).toarray()
    y=Classifier.predict(x)
    return getCategoryName(y[0])
   
    
def getCategoryName(string):
    category=""
    if string==0:
        category="arts & culture"
    elif string==1:
        category="black voices"
    elif string==2:
        category="business"
    elif string==3:
        category="crime"
    elif string==4:
        category="divorce"
    elif string==5:
        category="education"
    elif string==6:
        category="entertainment"
    elif string==7:
        category="environment"
    elif string==8:
        category="fifty"
    elif string==9:
        category="food & drink"
    elif string==10:
        category="good news"
    elif string==11:
        category="healthy living"
    elif string==12:
        category="home & living"
    elif string==13:
        category="impact"
    elif string==14:
        category="latino voices"
    elif string==15:
        category="media"
    elif string==16:
        category="money"
    elif string==17:
        category="parenting"
    elif string==18:
        category="politics"
    elif string==19:
        category="queer voices"
    elif string==20:
        category="religion"
    elif string==21:
        category="science & technology"
    elif string==22:
        category="sports"
    elif string==23:
        category="style & beauty"
    elif string==24:
        category="travel"
    elif string==25:
        category="weddings"
    elif string==26:
        category="weird news"
    elif string==27:
        category="women"
    elif string==28:
        category="world news"
    return category




#Returning
print(predictCategory(sys.argv[1]))
sys.stdout.flush()


