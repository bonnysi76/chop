
import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, ThumbsUp, Laugh, Angry, Sad } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

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

const reactions = [
  { icon: Heart, color: 'text-red-500', name: 'love', emoji: '❤️' },
  { icon: ThumbsUp, color: 'text-blue-500', name: 'like', emoji: '👍' },
  { icon: Laugh, color: 'text-yellow-500', name: 'laugh', emoji: '😂' },
  { icon: Angry, color: 'text-red-600', name: 'angry', emoji: '😠' },
  { icon: Sad, color: 'text-gray-500', name: 'sad', emoji: '😢' }
];

const AnimatedPost: React.FC<PostProps> = ({ id, author, content, image, timestamp, likes, comments, shares }) => {
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [showReactions, setShowReactions] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [postComments, setPostComments] = useState([
    {
      id: '1',
      author: 'Emma Wilson',
      content: 'Amazing! Keep it up! 💪',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      timestamp: '2m'
    },
    {
      id: '2',
      author: 'John Smith',
      content: 'This is so inspiring! Thanks for sharing.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      timestamp: '5m'
    }
  ]);
  const [floatingEmojis, setFloatingEmojis] = useState<Array<{id: string, emoji: string, x: number, y: number}>>([]);

  const handleReaction = (reactionName: string) => {
    const prevReaction = userReaction;
    setUserReaction(reactionName === userReaction ? null : reactionName);
    setLikeCount(prev => {
      if (prevReaction === null && reactionName !== userReaction) {
        return prev + 1;
      } else if (prevReaction !== null && reactionName === userReaction) {
        return prev - 1;
      }
      return prev;
    });
    setShowReactions(false);

    // Add floating emoji animation
    const reaction = reactions.find(r => r.name === reactionName);
    if (reaction) {
      const id = Date.now().toString();
      setFloatingEmojis(prev => [...prev, {
        id,
        emoji: reaction.emoji,
        x: Math.random() * 100,
        y: Math.random() * 100
      }]);

      // Remove floating emoji after animation
      setTimeout(() => {
        setFloatingEmojis(prev => prev.filter(emoji => emoji.id !== id));
      }, 2000);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now().toString(),
        author: 'You',
        content: newComment,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        timestamp: 'now'
      };
      setPostComments([comment, ...postComments]);
      setNewComment('');
    }
  };

  return (
    <Card className="mb-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
      {/* Floating Emojis */}
      {floatingEmojis.map(emoji => (
        <div
          key={emoji.id}
          className="absolute pointer-events-none text-2xl animate-bounce z-10"
          style={{
            left: `${emoji.x}%`,
            top: `${emoji.y}%`,
            animation: 'float-up 2s ease-out forwards'
          }}
        >
          {emoji.emoji}
        </div>
      ))}

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="ring-2 ring-purple-200 dark:ring-purple-700 transition-all duration-300 hover:ring-purple-400">
              <AvatarImage src={author.avatar} />
              <AvatarFallback className="bg-gradient-to-r from-purple-400 to-blue-400 text-white">
                {author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-sm hover:text-purple-600 transition-colors cursor-pointer">
                {author.name}
              </h4>
              <p className="text-gray-500 text-xs">@{author.username} · {timestamp}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="hover:bg-purple-50 dark:hover:bg-purple-900">
            <MoreHorizontal size={16} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-gray-900 dark:text-gray-100 mb-3 leading-relaxed">{content}</p>
        {image && (
          <div className="relative group">
            <img 
              src={image} 
              alt="Post content" 
              className="w-full rounded-lg mb-3 max-h-96 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg" />
          </div>
        )}

        {/* Reactions Bar */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() => setShowReactions(false)}
              onClick={() => !userReaction ? handleReaction('love') : setUserReaction(null)}
              className={`flex items-center space-x-2 transition-all duration-300 transform hover:scale-110 ${
                userReaction ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart size={16} className={userReaction === 'love' ? 'fill-current' : ''} />
              <span className="text-sm">{likeCount}</span>
            </Button>

            {/* Reaction Picker */}
            {showReactions && (
              <div 
                className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border p-2 flex space-x-1 animate-scale-in z-20"
                onMouseEnter={() => setShowReactions(true)}
                onMouseLeave={() => setShowReactions(false)}
              >
                {reactions.map((reaction) => {
                  const Icon = reaction.icon;
                  return (
                    <Button
                      key={reaction.name}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReaction(reaction.name)}
                      className={`p-2 hover:scale-125 transition-all duration-200 ${
                        userReaction === reaction.name ? reaction.color : 'text-gray-400 hover:' + reaction.color
                      }`}
                    >
                      <Icon size={20} className={userReaction === reaction.name ? 'fill-current' : ''} />
                    </Button>
                  );
                })}
              </div>
            )}
          </div>

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-all duration-300 transform hover:scale-110"
          >
            <MessageCircle size={16} />
            <span className="text-sm">{comments + postComments.length}</span>
          </Button>

          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-all duration-300 transform hover:scale-110"
          >
            <Share size={16} />
            <span className="text-sm">{shares}</span>
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 space-y-3 animate-fade-in">
            {/* Add Comment */}
            <div className="flex space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex space-x-2">
                <Input
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  Post
                </Button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {postComments.map((comment) => (
                <div key={comment.id} className="flex space-x-2 animate-slide-in-right">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.avatar} />
                    <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-sm">{comment.author}</span>
                      <span className="text-xs text-gray-500">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <style jsx>{`
        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) scale(1.5);
          }
        }
      `}</style>
    </Card>
  );
};

export default AnimatedPost;
