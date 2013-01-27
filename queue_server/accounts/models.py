from django.db import models
from django.contrib.auth.models import User

from gmusicapi.api import Api

import logging
logger = logging.getLogger(__name__)

class UserProfile(models.Model):
    user = models.OneToOneField(User)
    google_music_password = models.CharField(max_length=200)

    @staticmethod
    def get_google_music_api(user_id):
      api = Api()
      try:
        result = api.login(self.email, self.profile.google_music_password)
        return api, result
      except:
        user = User.objects.get(pk=user_id)
        result = api.login(user.email, user.profile.google_music_password)
        return api, result

User.profile = property(lambda u: UserProfile.objects.get_or_create(user=u)[0])
