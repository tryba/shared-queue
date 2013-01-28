from django.db import models
from django.contrib.auth.models import User

from gmusicapi.api import Api

import time
import logging
logger = logging.getLogger(__name__)

class Song(models.Model):
  id = models.CharField(max_length=200, primary_key=True)
  user = models.ForeignKey(User)
  album = models.CharField(max_length=200)
  artist = models.CharField(max_length=200)
  title = models.CharField(max_length=200)
  genre = models.CharField(max_length=200)
  play_count = models.IntegerField(null=True)
  last_played = models.DateTimeField(null=True)

  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'album': self.album,
      'artist': self.artist,
      'title': self.title,
      'genre': self.genre,
      'play_count': self.play_count,
      'last_played': self.last_played
    }

  @staticmethod
  def create_from_google_music(song, user_id):
    logger.info("song = " + str(song))
    logger.info("album = " + str(song['album']))
    if(song['deleted'] == False):
      new_song, created = Song.objects.get_or_create(pk=song['id'], user_id=user_id)
      new_song.genre = song['genre']
      new_song.title = song['title']
      new_song.album = song['album']
      new_song.artist = song['artist']
      new_song.play_count = song['playCount']
      new_song.last_played = time.strftime( "%Y-%m-%d %H:%M:%S", time.gmtime(song['lastPlayed']/1000000))
      new_song.save()
      return new_song
    return None

  def __unicode__(self):
    return self.album + '; ' + self.title
