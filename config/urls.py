"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from wwg import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include('wwg.urls')),
    path('' ,views.main,name="main" ),
    path('map/' ,views.map,name="map" ),
    path('mydata/' ,views.mydata,name="mydata" ),
    path('mypage/' ,views.mypage,name="mypage" ),
    path('myprofile/' ,views.myprofile,name="myprofile" ),
    path('RegionSee/' ,views.RegionSee,name="RegionSee" ),
    path('search/' ,views.search ,name="search" ),
    path('shopping/' ,views.shopping,name="shopping" ),
    
    
    
]
