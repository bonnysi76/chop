import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AnimatedPost from '@/components/AnimatedPost';
import Navigation from '@/components/Navigation';
import { Plus, Image, Smile } from 'lucide-react';

const Home = () => {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState([
    {
      id: '1',
      author: {
        name: 'Sarah Johnson',
        username: 'sarahj',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b287?w=150'
      },
      content: 'Just finished an amazing workout session! Feeling energized and ready to tackle the day. 💪 #fitness #motivation',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
      timestamp: '2h',
      likes: 24,
      comments: 8,
      shares: 3
    },
    {
      id: '2',
      author: {
        name: 'Alex Chen',
        username: 'alexc',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
      },
      content: 'Beautiful sunset from my balcony tonight. Sometimes you just need to pause and appreciate the simple things in life. 🌅',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
      timestamp: '4h',
      likes: 42,
      comments: 12,
      shares: 7
    },
    {
      id: '3',
      author: {
        name: 'Emma Davis',
        username: 'emmad',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
      },
      content: 'Coffee and code - the perfect combination for a productive morning! ☕️👩‍💻 Working on something exciting that I can\'t wait to share.',
      timestamp: '6h',
      likes: 18,
      comments: 5,
      shares: 2
    }
  ]);

  const handlePost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now().toString(),
        author: {
          name: 'You',
          username: 'you',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
        },
        content: newPost,
        timestamp: 'now',
        likes: 0,
        comments: 0,
        shares: 0
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto pt-4 pb-20 md:pb-4">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6 p-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Social Feed</h1>
          <Navigation />
        </div>

        {/* Create Post */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">What's on your mind?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-3">
              <Avatar>
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Share something interesting..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="mb-3 resize-none"
                  rows={3}
                />
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Image size={16} className="mr-1" />
                      Photo
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Smile size={16} className="mr-1" />
                      Emoji
                    </Button>
                  </div>
                  <Button onClick={handlePost} disabled={!newPost.trim()}>
                    <Plus size={16} className="mr-1" />
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <AnimatedPost key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
