# Create your views here.
from django.shortcuts import render,redirect

from rest_framework import viewsets
from .models import Users, Records, Regions, Markings
from .serializers import RecordsFilterSerializer,UsersSerializer, RecordsSerializer, RegionsSerializer, MarkingsSerializer
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django_filters import rest_framework as filters



### 페이지-html 매핑 views ###
def index(request):
    return render(request,"index.html")

def main(request):
    user_nickname = request.session.get('user_nickname', None)  # 세션에서 닉네임 정보 가져오기

    context = {
        'user_nickname': user_nickname,
    }
    return render(request, "main.html", context)

def map(request):
    return render(request,"map.html")

def mydata(request):
    return render(request,"mydata.html")

def mypage(request):
    return render(request,"mypage.html")

def myprofile(request):
    return render(request,"myprofile.html")

def RegionSee(request):
    return render(request,'RegionSee.html')

def search(request):
    return render(request,"search.html")

def shopping(request):
    return render(request,"shopping.html")

def pathline(request):
    return render(request,"pathline.html")

class UsersViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer

class RecordsViewSet(viewsets.ModelViewSet):
    queryset = Records.objects.all()
    serializer_class = RecordsSerializer

class RegionsViewSet(viewsets.ModelViewSet):
    queryset = Regions.objects.all()
    serializer_class = RegionsSerializer

class MarkingsViewSet(viewsets.ModelViewSet):
    queryset = Markings.objects.all()
    serializer_class = MarkingsSerializer

# Records모델에서 특정 단어 필터링(이건 시작위치 필터링 함수)
##필터링 기능미완###
class RecordsFilter(filters.FilterSet):
    start_location = filters.CharFilter(lookup_expr='exact')

    class Meta:
        model = Records
        fields = ('start_location',)

class RecordsFilterViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Records.objects.all()
    serializer_class = RecordsFilterSerializer
    filterset_class = RecordsFilter

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

    user_nickname = user_info.get('properties', {}).get('nickname')

    # 닉네임 정보를 세션에 저장
    request.session['user_nickname'] = user_nickname

    return redirect('main')  # 리다이렉트를 통해 메인 페이지로 이동