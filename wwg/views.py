# Create your views here.
from django.shortcuts import render

from rest_framework import viewsets
from .models import Users, Records, Regions, Markings
from .serializers import RecordsFilterSerializer,UsersSerializer, RecordsSerializer, RegionsSerializer, MarkingsSerializer
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django_filters import rest_framework as filters



### 페이지-html 매핑 views ###

def main(request):
    return render(request,"main.html")

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

# class kakaoOAuth2Adapter(OAuth2Adapter):
#     provider_id = kakaoProvider.id
#     access_token_url="https://kauth.kakao.com/oauth/token"
#     authorize_url = "https://kauth.kakao.com/oauth/authorize"
#     profile_url = "https://kapi.kakao.com/v2/user/me"
    
#     def complete_login(self,request,app,token,**kwargs):
#         headers = {"Authorization":"Bearer {0}".format(token.token)}
#         resp =requests.get(self.profile_url,headers=headers)
#         resp.raise_for_status()