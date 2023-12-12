import webbrowser
import os

filename = 'file:///'+os.getcwd()+'/src/' + 'MainPage.html'
webbrowser.open_new_tab(filename)