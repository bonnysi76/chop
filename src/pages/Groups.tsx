import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import { Plus, Users, Search, Settings, Globe, Lock, Eye } from 'lucide-react';

const Groups = () => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    privacy: 'public',
    category: ''
  });

  const [groups, setGroups] = useState([
    {
      id: '1',
      name: 'Photography Enthusiasts',
      description: 'Share your best shots and learn from other photographers',
      members: 2847,
      posts: 156,
      privacy: 'public',
      category: 'Photography',
      cover: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500',
      avatar: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=150',
      joined: true
    },
    {
      id: '2',
      name: 'Fitness & Wellness',
      description: 'Motivation, tips, and support for your fitness journey',
      members: 5632,
      posts: 423,
      privacy: 'public',
      category: 'Health',
      cover: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
      avatar: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=150',
      joined: true
    },
    {
      id: '3',
      name: 'Tech Innovators',
      description: 'Discuss the latest in technology and innovation',
      members: 1234,
      posts: 89,
      privacy: 'private',
      category: 'Technology',
      cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500',
      avatar: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=150',
      joined: false
    },
    {
      id: '4',
      name: 'Travel Buddies',
      description: 'Find travel companions and share your adventures',
      members: 892,
      posts: 267,
      privacy: 'public',
      category: 'Travel',
      cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
      avatar: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=150',
      joined: false
    }
  ]);

  const handleCreateGroup = () => {
    if (newGroup.name && newGroup.description) {
      const group = {
        id: Date.now().toString(),
        ...newGroup,
        members: 1,
        posts: 0,
        cover: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500',
        avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150',
        joined: true
      };
      setGroups([group, ...groups]);
      setNewGroup({ name: '', description: '', privacy: 'public', category: '' });
      setShowCreateGroup(false);
    }
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto pt-4 pb-20 md:pb-4">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6 p-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Groups</h1>
          <Navigation />
        </div>

        {/* Search and Create */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button 
            onClick={() => setShowCreateGroup(true)}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
          >
            <Plus size={16} className="mr-2" />
            Create Group
          </Button>
        </div>

        {/* Create Group Modal */}
        {showCreateGroup && (
          <Card className="mb-6 border-purple-200 dark:border-purple-700 animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Create New Group</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowCreateGroup(false)}
                >
                  ✕
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Group Name</label>
                <Input
                  placeholder="Enter group name"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  placeholder="What is this group about?"
                  value={newGroup.description}
                  onChange={(e) => setNewGroup(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Input
                    placeholder="e.g., Technology, Sports, Art"
                    value={newGroup.category}
                    onChange={(e) => setNewGroup(prev => ({ ...prev, category: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Privacy</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={newGroup.privacy}
                    onChange={(e) => setNewGroup(prev => ({ ...prev, privacy: e.target.value }))}
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCreateGroup(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateGroup}
                  disabled={!newGroup.name || !newGroup.description}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  Create Group
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <Card key={group.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              {/* Cover Image */}
              <div className="relative h-32 bg-gradient-to-r from-purple-400 to-blue-400">
                <img 
                  src={group.cover} 
                  alt={group.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  {group.privacy === 'private' ? (
                    <Badge className="bg-red-500 text-white">
                      <Lock size={12} className="mr-1" />
                      Private
                    </Badge>
                  ) : (
                    <Badge className="bg-green-500 text-white">
                      <Globe size={12} className="mr-1" />
                      Public
                    </Badge>
                  )}
                </div>
              </div>

              <CardContent className="p-4">
                {/* Group Info */}
                <div className="flex items-start space-x-3 mb-3">
                  <Avatar className="w-12 h-12 border-2 border-white -mt-6 relative z-10">
                    <AvatarImage src={group.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-400 to-blue-400 text-white">
                      {group.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{group.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {group.category}
                    </Badge>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                  {group.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Users size={14} />
                    <span>{group.members.toLocaleString()} members</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye size={14} />
                    <span>{group.posts} posts</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className={`w-full transition-all duration-300 ${
                    group.joined 
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                      : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white'
                  }`}
                >
                  {group.joined ? (
                    <>
                      <Settings size={16} className="mr-2" />
                      Manage
                    </>
                  ) : (
                    <>
                      <Plus size={16} className="mr-2" />
                      Join Group
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No groups found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or create a new group.</p>
            <Button 
              onClick={() => setShowCreateGroup(true)}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              <Plus size={16} className="mr-2" />
              Create Group
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Groups;
