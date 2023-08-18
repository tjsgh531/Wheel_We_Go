# Create your views here.
from django.shortcuts import render,redirect

from rest_framework import viewsets
from .models import *

from .serializers import *

from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django_filters import rest_framework as filters

#filtering
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import LimitOffsetPagination



### 페이지-html 매핑 views ###
def rending(request):
    return render(request,"10.firstPage.html")
def index(request):
    return render(request,"01index.html")

def main(request):
    #카카오 닉네임가져오기 부분 고치는중
    user_nickname = request.session.get('user_nickname', None)  # 세션에서 닉네임 정보 가져오기

    context = {
        'user_nickname': user_nickname,
    }
    return render(request, "02main.html", context)

def mydata(request):
    return render(request,"07mydata.html")

def mypage(request):
    return render(request,"03mypage.html")

def myprofile(request):
    return render(request,"myprofile.html")

# view 기능 추가하려고 수정중 
def serviceRegion(request):
    return render(request,'05serviceRegion.html')

def shopping(request):
    return render(request,"04shopping.html")

def no(request):
    return render(request,"08no.html")
######### REST API VIEWSET ########
class UsersViewSet(viewsets.ModelViewSet):
    queryset = kakaoUsers.objects.all()
    serializer_class = UsersSerializer
    filter_backends=[DjangoFilterBackend]
    #필터 필요시 추가
    #filterset_fields=['']


class RegionsViewSet(viewsets.ModelViewSet):
    queryset = Regions.objects.all()
    serializer_class = RegionsSerializer
    filter_backends=[DjangoFilterBackend]
    #필터 필요시 추가
    filterset_fields=['regions']

class saveRecordsViewSet(viewsets.ModelViewSet):
    queryset = saveRecord.objects.all()
    serializer_class = saveRecordSerializer
    filter_backends=[DjangoFilterBackend]
    #필터 필요시 추가
    filterset_fields=[]
    
from rest_framework import generics

class SaveRecordCreateView(generics.CreateAPIView):
    queryset = saveRecord.objects.all()
    serializer_class = SaveRecordSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        # Update user's coin
        user_id = instance.user_id
        earned_coin = instance.earnedCoin
        user = kakaoUsers.objects.get(user_id=user_id)
        user.user_coin += earned_coin
        user.save()
        
import requests

def callback_view(request):
    # 카카오로부터 받은 인증 코드를 이용하여 토큰을 받아옴
    code = request.GET.get('code')
    response = requests.post(
        'https://kauth.kakao.com/oauth/token',
        data={
            'grant_type': 'authorization_code',
            'client_id': '6aae09aeeec4e992f89293eb333535be',
            'redirect_uri': 'http://127.0.0.1:8000/main/',
            'code': code,
        },
    )
    token = response.json().get('access_token')

    # 토큰을 이용하여 사용자 정보 가져오기
    user_info_response = requests.get(
        'https://kapi.kakao.com/v2/user/me',
        headers={'Authorization': f'Bearer {token}'},
    )
    user_info = user_info_response.json()
    # 카카오 사용자 정보 변수에 저장
    user_email = user_info.get('kakao_account', {}).get('email')
    user_nickname = user_info.get('properties', {}).get('nickname')
    # 사용자 정보 저장
    #user, created= Users.objects.create(user_id=user_nickname, user_email=user_email)
    user_instance = kakaoUsers(user_id = user_nickname,user_email=user_email,coin = 0)
    user_instance.save()
    # 닉네임 정보를 세션에 저장
    request.session['user_nickname'] = user_nickname

    return redirect('main')  # 리다이렉트를 통해 메인 페이지로 이동

def index_name_mydata(request):
    user= request.user.username
    return render(request,'07mydata.html',{'user':user})
def index_name_mypage(request):
    user= request.user.username
    return render(request,'03mypage.html',{'user':user})



from django.contrib.auth.decorators import login_required

# def index_name_mypage(request):
#     user= request.user
#     kakao_user = kakaoUsers.objects.all()
    
#     return render(request,'03mydata.html',{'user':user,'kakao_user': kakao_user})

