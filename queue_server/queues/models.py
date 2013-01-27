from django.db import models
from django.contrib.auth.models import User
from music.models import Song
import time

import logging
logger = logging.getLogger(__name__)

class Queue(models.Model):
  user = models.ForeignKey(User)
  access_token = models.CharField(max_length=200)
  songs = models.ManyToManyField(Song, through="Membership")

  def to_dict(self):
    return {
     'id': self.id,
     'songs':self.get_queued_songs()
    }

  def push(self, song):
    membership = Membership(queue=self, song=song, date_joined=time.strftime( "%Y-%m-%d %H:%M:%S", time.gmtime()))
    membership.save()

  def pop(self):
    memberships = Membership.objects.filter(queue=self, date_played__isnull=True)
    if(len(memberships) > 0):
      membership = memberships[0]
      membership.date_played = time.strftime( "%Y-%m-%d %H:%M:%S", time.gmtime())
      membership.save()
      return membership.song
    return None

  def get_queued_songs(self):
    memberships = Membership.objects.filter(queue=self, date_played__isnull=True)
    songs = []
    for membership in memberships:
      song = membership.song.to_dict()
      song['membership_id'] = membership.id
      songs.append(song)
    return songs

class Membership(models.Model):
  queue = models.ForeignKey(Queue)
  song = models.ForeignKey(Song)
  date_joined = models.DateTimeField()
  date_played = models.DateTimeField(null=True)
  class Meta:
    ordering = ['date_joined']