from django.shortcuts import render
from django.http import HttpResponse
from author.models import Author
from post.models import Post
from like.models import Like
from rest_framework.views import APIView
from rest_framework.response import Response
from like.serializers import LikeSerializer

# Create your views here.
class LikeList(APIView):
    
    # Get all Likes, for all authors, for all posts
    def get(self, request, author_id, post_id): 
        all_likes = Like.objects.all()
        serializer = LikeSerializer(all_likes, many = True)
        for each_object in serializer.data:
            author = Author.objects.get(pk=each_object['author']).toString()
            author['id']=each_object['author']
            each_object['author']=author
       
        return Response(serializer.data, status = 200)

    # Add a like object
    def post(self, request, author_id, post_id):
        # Mutable copy
        request_data = request.data.copy()
        serializer = LikeSerializer(data = request_data)
        author1 = Author.objects.get(pk=author_id)
        post1 = Post.objects.get(pk=post_id)
        
        if serializer.is_valid():
            serializer.save(summary = author1.displayName + " likes your post")
            serializer.save(author = author1)
            serializer.save(object = post1)
            return Response(serializer.data, status = 201)
        else:
            return Response(serializer.errors, status = 400)
















class LikedDetails(APIView):
    # We require a author_id to be passed with the request (in the url) to get a user
    
    # Get the likes of a specific author
    def get(self, request, author_id):
        # INCLUDE PERMISSION CHECKS BEFORE DOING THIS
        try:
            liked = Like.objects.filter(author=author_id)
            serializer = LikeSerializer(liked, many=True)
            return Response(serializer.data, status = 200)

        except Like.DoesNotExist:
            return HttpResponse("Author not found.", status = 401)