import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from '../config';
import {
    PencilIcon,
    CheckIcon,
    XMarkIcon,
    LockClosedIcon,
    EyeIcon,
    EyeSlashIcon
} from '@heroicons/react/24/outline';

export function Profile() {
    const navigate = useNavigate();
    const { user, updateUser } = useUser();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Profile editing state
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profileData, setProfileData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.username || ''
    });

    // Password change state
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    useEffect(() => {
        if (user) {
            setProfileData({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.username
            });
        }
    }, [user]);

    const handleProfileUpdate = async () => {
        setLoading(true);
        setMessage(null);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${BACKEND_URL}/v1/user/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: profileData.firstName,
                    lastName: profileData.lastName
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
                updateUser({
                    firstName: profileData.firstName,
                    lastName: profileData.lastName
                });
                setIsEditingProfile(false);
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to update profile' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred while updating profile' });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordUpdate = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setMessage({ type: 'error', text: 'New password must be at least 6 characters long' });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${BACKEND_URL}/v1/user/password`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Password updated successfully!' });
                setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
                setIsChangingPassword(false);
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to update password' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred while updating password' });
        } finally {
            setLoading(false);
        }
    };

    const getInitials = () => {
        if (!user) return '';
        return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    };

    const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Button 
                        text="← Back to Dashboard" 
                        onClick={() => navigate('/dashboard')}
                        variant="secondary"
                    />
                    <h1 className="text-3xl font-bold text-gray-900 mt-4">Profile Settings</h1>
                    <p className="text-gray-600 mt-2">Manage your account information and security settings</p>
                </div>

                {/* Message Display */}
                {message && (
                    <div className={`mb-6 p-4 rounded-lg ${
                        message.type === 'success' 
                            ? 'bg-green-50 border border-green-200 text-green-800' 
                            : 'bg-red-50 border border-red-200 text-red-800'
                    }`}>
                        {message.text}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Information Card */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                                {!isEditingProfile ? (
                                    <Button
                                        text="Edit Profile"
                                        startIcon={<PencilIcon className="w-4 h-4" />}
                                        onClick={() => setIsEditingProfile(true)}
                                        variant="secondary"
                                    />
                                ) : (
                                    <div className="flex space-x-2">
                                        <Button
                                            text="Save"
                                            startIcon={<CheckIcon className="w-4 h-4" />}
                                            onClick={handleProfileUpdate}
                                            variant="primary"
                                            disabled={loading}
                                        />
                                        <Button
                                            text="Cancel"
                                            startIcon={<XMarkIcon className="w-4 h-4" />}
                                            onClick={() => {
                                                setIsEditingProfile(false);
                                                setProfileData({
                                                    firstName: user.firstName,
                                                    lastName: user.lastName,
                                                    email: user.username
                                                });
                                            }}
                                            variant="secondary"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name
                                    </label>
                                    <Input
                                        type="text"
                                        value={profileData.firstName}
                                        onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                                        disabled={!isEditingProfile}
                                        placeholder="Enter your first name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name
                                    </label>
                                    <Input
                                        type="text"
                                        value={profileData.lastName}
                                        onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                                        disabled={!isEditingProfile}
                                        placeholder="Enter your last name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <Input
                                        type="email"
                                        value={profileData.email}
                                        disabled={true}
                                        placeholder="Your email address"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        Email address cannot be changed
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* User Avatar and Quick Info */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="text-center">
                                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-white">
                                        {getInitials()}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {user.firstName} {user.lastName}
                                </h3>
                                <p className="text-gray-600 text-sm">{user.username}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Password Change Card */}
                <div className="mt-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
                                <p className="text-gray-600 text-sm mt-1">Update your password to keep your account secure</p>
                            </div>
                            {!isChangingPassword ? (
                                <Button
                                    text="Change Password"
                                    startIcon={<LockClosedIcon className="w-4 h-4" />}
                                    onClick={() => setIsChangingPassword(true)}
                                    variant="secondary"
                                />
                            ) : (
                                <div className="flex space-x-2">
                                    <Button
                                        text="Update Password"
                                        startIcon={<CheckIcon className="w-4 h-4" />}
                                        onClick={handlePasswordUpdate}
                                        variant="primary"
                                        disabled={loading}
                                    />
                                    <Button
                                        text="Cancel"
                                        startIcon={<XMarkIcon className="w-4 h-4" />}
                                        onClick={() => {
                                            setIsChangingPassword(false);
                                            setPasswordData({
                                                currentPassword: '',
                                                newPassword: '',
                                                confirmPassword: ''
                                            });
                                        }}
                                        variant="secondary"
                                    />
                                </div>
                            )}
                        </div>

                        {isChangingPassword && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Current Password
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type={showPasswords.current ? "text" : "password"}
                                            value={passwordData.currentPassword}
                                            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                                            placeholder="Enter your current password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => togglePasswordVisibility('current')}
                                        >
                                            {showPasswords.current ? (
                                                <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <EyeIcon className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type={showPasswords.new ? "text" : "password"}
                                            value={passwordData.newPassword}
                                            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                                            placeholder="Enter your new password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => togglePasswordVisibility('new')}
                                        >
                                            {showPasswords.new ? (
                                                <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <EyeIcon className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm New Password
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type={showPasswords.confirm ? "text" : "password"}
                                            value={passwordData.confirmPassword}
                                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                            placeholder="Confirm your new password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => togglePasswordVisibility('confirm')}
                                        >
                                            {showPasswords.confirm ? (
                                                <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <EyeIcon className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h4 className="text-sm font-medium text-blue-900 mb-2">Password Requirements</h4>
                                    <ul className="text-sm text-blue-800 space-y-1">
                                        <li>• At least 6 characters long</li>
                                        <li>• Should be different from your current password</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
