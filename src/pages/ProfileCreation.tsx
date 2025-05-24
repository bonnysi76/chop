import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Upload, User, MapPin, Calendar, Globe } from 'lucide-react';

const ProfileCreation = () => {
  const [profileData, setProfileData] = useState({
    avatar: '',
    displayName: '',
    username: '',
    bio: '',
    location: '',
    website: '',
    birthday: ''
  });
  const [step, setStep] = useState(1);
  const [avatarPreview, setAvatarPreview] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarPreview(result);
        setProfileData(prev => ({ ...prev, avatar: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinish = () => {
    console.log('Profile created:', profileData);
    // Navigate to main app
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Create Your Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Let's make your profile shine! ({step}/3)
          </p>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-4">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <Card className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border-0 shadow-2xl animate-scale-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {step === 1 && 'Upload Your Photo'}
              {step === 2 && 'Basic Information'}
              {step === 3 && 'Tell Us About Yourself'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Avatar Upload */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative group">
                    <Avatar className="w-32 h-32 border-4 border-purple-200 dark:border-purple-700">
                      <AvatarImage src={avatarPreview} />
                      <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-400 to-blue-400 text-white">
                        <User size={48} />
                      </AvatarFallback>
                    </Avatar>
                    <label 
                      htmlFor="avatar-upload"
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <Camera className="w-8 h-8 text-white" />
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </div>
                  <div className="text-center">
                    <Button 
                      variant="outline" 
                      className="transition-all duration-300 hover:scale-105"
                      onClick={() => document.getElementById('avatar-upload')?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Photo
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">
                      JPG, PNG or GIF (max 5MB)
                    </p>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button 
                    onClick={handleNext}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 px-8"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Basic Info */}
            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name *</Label>
                    <Input
                      id="displayName"
                      name="displayName"
                      placeholder="Your full name"
                      value={profileData.displayName}
                      onChange={handleInputChange}
                      className="transition-all duration-300 focus:scale-105"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username *</Label>
                    <Input
                      id="username"
                      name="username"
                      placeholder="@username"
                      value={profileData.username}
                      onChange={handleInputChange}
                      className="transition-all duration-300 focus:scale-105"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Location
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="City, Country"
                      value={profileData.location}
                      onChange={handleInputChange}
                      className="transition-all duration-300 focus:scale-105"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">
                      <Globe className="w-4 h-4 inline mr-1" />
                      Website
                    </Label>
                    <Input
                      id="website"
                      name="website"
                      placeholder="https://yourwebsite.com"
                      value={profileData.website}
                      onChange={handleInputChange}
                      className="transition-all duration-300 focus:scale-105"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthday">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Birthday
                  </Label>
                  <Input
                    id="birthday"
                    name="birthday"
                    type="date"
                    value={profileData.birthday}
                    onChange={handleInputChange}
                    className="transition-all duration-300 focus:scale-105"
                  />
                </div>

                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevious}
                    className="flex-1 transition-all duration-300 hover:scale-105"
                  >
                    Previous
                  </Button>
                  <Button 
                    onClick={handleNext}
                    disabled={!profileData.displayName || !profileData.username}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Bio and Interests */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell us about yourself... What do you love? What are you passionate about?"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="transition-all duration-300 focus:scale-105 resize-none"
                  />
                  <p className="text-sm text-gray-500">
                    {profileData.bio.length}/160 characters
                  </p>
                </div>

                {/* Profile Preview */}
                <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
                  <h3 className="font-semibold mb-3">Profile Preview</h3>
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={avatarPreview} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-400 text-white">
                        {profileData.displayName.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold">{profileData.displayName || 'Your Name'}</h4>
                      <p className="text-gray-500">@{profileData.username || 'username'}</p>
                      <p className="text-sm mt-2">{profileData.bio || 'Your bio will appear here...'}</p>
                      {profileData.location && (
                        <p className="text-sm text-gray-500 mt-1">
                          <MapPin className="w-3 h-3 inline mr-1" />
                          {profileData.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevious}
                    className="flex-1 transition-all duration-300 hover:scale-105"
                  >
                    Previous
                  </Button>
                  <Button 
                    onClick={handleFinish}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                  >
                    Complete Profile
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileCreation;
