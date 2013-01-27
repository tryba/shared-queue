from django.shortcuts import render_to_response
from django.shortcuts import redirect
from django.template import RequestContext
from django.contrib.auth.models import User
from accounts.models import UserProfile
from queues.models import Queue
from queues.models import Membership
from music.models import Song
from queue_server.decorators import AllowJSONPCallback

from django.http import HttpResponse
import json
import logging
logger = logging.getLogger(__name__)

@AllowJSONPCallback
def create(request, user_id):
  queue = Queue(user_id=user_id)
  queue.save()
  return HttpResponse(json.dumps(queue.to_dict()), mimetype="application/json")

@AllowJSONPCallback
def view_one(request, user_id, queue_id):
  queue = Queue.objects.get(id=queue_id)
  return HttpResponse(json.dumps(queue.to_dict()), mimetype="application/json")

@AllowJSONPCallback
def view_all(request, user_id):
  queues = Queue.objects.filter(user_id=user_id)
  return HttpResponse(json.dumps([queue.to_dict() for queue in queues]), mimetype="application/json")

@AllowJSONPCallback
def push_song(request, user_id, queue_id, song_id):
  queue = Queue.objects.get(id=queue_id)
  song = Song.objects.get(id=song_id)
  queue.push(song)
  return HttpResponse(json.dumps(queue.to_dict()), mimetype="application/json")

@AllowJSONPCallback
def remove_membership(request, user_id, queue_id, membership_id):
  membership = Membership(id=membership_id )
  membership.delete()
  queue = Queue.objects.get(id=queue_id)
  return HttpResponse(json.dumps(queue.to_dict()), mimetype="application/json")

@AllowJSONPCallback
def pop_song(request, user_id, queue_id):
  queue = Queue.objects.get(id=queue_id)
  response = {}
  song = queue.pop()
  if(song != None):
    api, result = UserProfile.get_google_music_api(user_id)
    stream_url = api.get_stream_url(song.id)
    song_dict = song.to_dict()
    song_dict['stream_url'] = stream_url
    response['popped_song'] = song_dict
  response['queue'] = queue.to_dict()

  return HttpResponse(json.dumps(response), mimetype="application/json")
