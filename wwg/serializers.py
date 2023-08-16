from rest_framework import serializers
from .models import kakaoUsers, Regions, saveRecord


### 모델마다 모든 레코드의 CRUD Serializer ###
class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = kakaoUsers
        fields = '__all__'


class RegionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Regions
        fields = '__all__'

class saveRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = saveRecord
        fields = '__all__'


class EarnedCoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = kakaoUsers
        fields = ['user_coin']

class SaveRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = saveRecord
        fields = ['user_id', 'earnedCoin', 'info']
