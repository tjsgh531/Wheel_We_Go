from rest_framework import serializers
from .models import kakaoUsers, Records, Regions, Markings,SearchRecords





### 모델마다 모든 레코드의 CRUD Serializer ###
class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = kakaoUsers
        fields = '__all__'

class RecordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Records
        fields = '__all__'

class RegionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Regions
        fields = '__all__'

class MarkingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Markings
        fields = '__all__'
class SearchRecordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchRecords
        fields = '__all__'

### 각 모델마다 필터링용 Serializer ###
class RecordsFilterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Records
        fields = ('start_location','end_location','TIME','feedback','credits_earned','record_date','data_valid','km')


### 이동거리 값 반환 ###
class DataSerializer(serializers.Serializer):
    dong = serializers.CharField(max_length=100)
    mapCount = serializers.IntegerField()
    mapDistance = serializers.IntegerField()




##필터링 기능미완###