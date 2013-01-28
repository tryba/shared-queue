from django.shortcuts import render_to_response
from django.shortcuts import redirect
from django.template import RequestContext
from django.contrib.auth.models import User
from accounts.models import UserProfile
from music.models import Song
from queue_server.decorators import AllowJSONPCallback

from gmusicapi.api import Api
from django.http import HttpResponse

import json
import logging
logger = logging.getLogger(__name__)

@AllowJSONPCallback
def sync(request, user_id):
  api, result = UserProfile.get_google_music_api(user_id)
  if(result):
    songs = api.get_all_songs()
    song_dicts = [Song.create_from_google_music(song, user_id).to_dict() for song in songs]
    return HttpResponse(json.dumps({'songs':song_dicts, 'id': user_id}), mimetype="application/json")

  else:
    logger.warn("Failed to log in!")
    return HttpResponse(json.dumps({'message':'Could not log in to Google Music'}), mimetype="application/json")

@AllowJSONPCallback
def view_one(request, user_id, song_id):
  song = Song.objects.get(id=song_id)
  return HttpResponse(json.dumps(song.to_dict()), mimetype="application/json")

@AllowJSONPCallback
def view_all(request, user_id):
  songs = Song.objects.filter(user_id=user_id)
  return HttpResponse(json.dumps({'songs':[song.to_dict() for song in songs], 'id':user_id}), mimetype="application/json")

@AllowJSONPCallback
def stream_url(request, user_id, song_id):
  api, result = UserProfile.get_google_music_api(user_id)
  if(result):
    song = {
      'id': song_id,
      'stream_url': api.get_stream_url(song_id)
    }
    return HttpResponse(json.dumps(song), mimetype="application/json")
  else:
    logger.warn("Failed to log in!")
    return HttpResponse(json.dumps({'message':'Could not log in to Google Music'}), mimetype="application/json")