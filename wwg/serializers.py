from rest_framework import serializers
from .models import kakaoUsers, Records, Regions, Markings


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

### 각 모델마다 필터링용 Serializer ###
class RecordsFilterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Records
        fields = ('start_location','end_location','TIME','feedback','credits_earned','record_date','data_valid','km')


##필터링 기능미완###