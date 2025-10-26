
from google.oauth2 import id_token
from google.auth.transport import requests
def verify_google_token(token):
    
    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request())
        print(idinfo)
        # Se quiser, garanta que veio do seu app
        
        return idinfo  # contém email, nome, picture etc.
    except ValueError:
        return None