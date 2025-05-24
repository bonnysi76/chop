
import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface PostProps {
  id: string;
  author: {
    name: string;
    username: string;
    avatar?: string;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
}

const Post: React.FC<PostProps> = ({ author, content, image, timestamp, likes, comments, shares }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={author.avatar} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-sm">{author.name}</h4>
              <p className="text-gray-500 text-xs">@{author.username} · {timestamp}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal size={16} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-gray-900 dark:text-gray-100 mb-3">{content}</p>
        {image && (
          <img 
            src={image} 
            alt="Post content" 
            className="w-full rounded-lg mb-3 max-h-96 object-cover"
          />
        )}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex items-center space-x-2 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
          >
            <Heart size={16} className={isLiked ? 'fill-current' : ''} />
            <span className="text-sm">{likeCount}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-500">
            <MessageCircle size={16} />
            <span className="text-sm">{comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-500">
            <Share size={16} />
            <span className="text-sm">{shares}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Post;
