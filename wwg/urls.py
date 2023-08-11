from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *


# ViewSet 클래스들을 인스턴스화하여 라우터에 등록
router = DefaultRouter()
router.register(r'users', UsersViewSet)
router.register(r'records', RecordsViewSet)
router.register(r'regions', RegionsViewSet)
router.register(r'markings', MarkingsViewSet)
router.register(r'filtered-records', RecordsFilterViewSet, basename='filtered-records')

urlpatterns = [
    path('' , include(router.urls)),
    path('accounts/',include('allauth.urls'))
    # 아래주석은 지워도됨
    # path('users/',user_list),

] 