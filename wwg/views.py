# Create your views here.
from django.shortcuts import render,redirect

from rest_framework import viewsets
from .models import kakaoUsers, Records, Regions, Markings

from .serializers import RecordsFilterSerializer,UsersSerializer, RecordsSerializer, RegionsSerializer, MarkingsSerializer

from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django_filters import rest_framework as filters

#filtering
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import LimitOffsetPagination



### 페이지-html 매핑 views ###
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

class RecordsViewSet(viewsets.ModelViewSet):
    queryset = Records.objects.all()
    serializer_class = RecordsSerializer
    filter_backends=[DjangoFilterBackend]
    #필터 필요시 추가
    filterset_fields=['user_id','start_location']

class RegionsViewSet(viewsets.ModelViewSet):
    queryset = Regions.objects.all()
    serializer_class = RegionsSerializer
    filter_backends=[DjangoFilterBackend]
    #필터 필요시 추가
    filterset_fields=['regions']

class MarkingsViewSet(viewsets.ModelViewSet):
    queryset = Markings.objects.all()
    serializer_class = MarkingsSerializer
    filter_backends=[DjangoFilterBackend]
    #필터 필요시 추가
    filterset_fields=['records_id']

    # 아래주석은 지워도 됨
''' 
@csrf_exempt
def user_list(request):
    if request.method =='GET':
        users = Users.objects.all()
        serializer = UsersSerializer(users, many = True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method =='POST':
        data = JSONParser().parse(request)
        serializer = UsersSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data,status=201)
        return JsonResponse(serializer.errors,status=400)
        --------------------------------
class RecordsFilter(filters.FilterSet):
    start_location = filters.CharFilter(lookup_expr='exact')

    class Meta:
        model = Records
        fields = ('start_location',)

class RecordsFilterViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Records.objects.all()
    serializer_class = RecordsFilterSerializer
    filterset_class = RecordsFilter

        '''
        
        
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

def index_name(request):
    user= request.user
    return render(request,'07mydata.html',{'user':user})
