from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
from .models import kakaoUsers, Records, Regions
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(user_logged_in)
def save_kakao_user(sender, request, user, **kwargs):
    # 카카오 사용자 정보가 있는 경우만 처리
    if user.socialaccount_set.filter(provider='kakao').exists():
        # 최초 로그인 시에만 coin을 0으로 초기화
        if not kakaoUsers.objects.filter(user_id=user.username).exists():
            kakao_user = kakaoUsers.objects.create(
                user_email=user.email,
                user_id=user.username,
                user_coin=0
            )


@receiver(post_save, sender=Records)
def update_regions(sender, instance, created, **kwargs):
    try:
        regions_instance = Regions.objects.get(regions=instance.start_location)
        regions_instance.kms += instance.km
        regions_instance.stacks += 1
        regions_instance.save()
    except Regions.DoesNotExist:
        Regions.objects.create(
            regions=instance.start_location,
            kms=instance.kms,
            stacks=1
        )