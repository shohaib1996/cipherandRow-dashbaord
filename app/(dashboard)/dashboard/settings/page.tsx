// "use client";

// import React, { useState } from "react";
// import {
//   User,
//   Zap,
//   Bell,
//   Shield,
//   CreditCard,
//   Mail,
//   Calendar,
// } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";

// export default function SettingsPage() {
//   // State for toggles
//   const [autoResolve, setAutoResolve] = useState(true);
//   const [emailNotifs, setEmailNotifs] = useState(true);
//   const [weeklyReports, setWeeklyReports] = useState(true);
//   const [newMsgAlerts, setNewMsgAlerts] = useState(true);
//   const [escalationAlerts, setEscalationAlerts] = useState(true);
//   const [emailToConv, setEmailToConv] = useState(false);

//   return (
//     <div className="min-h-screen font-sans">
//       <div className="container mx-auto py-8 px-4 space-y-8">
//         {/* Header */}
//         <div>
//           <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
//           <p className="text-slate-500 mt-1">
//             Manage your account and bot configuration
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Profile Settings */}
//           <Card className="border-slate-200 shadow-sm rounded-sm bg-white">
//             <CardHeader className="flex flex-row items-center gap-3 pb-4 border-b border-slate-100">
//               <div className="w-8 h-8 rounded-sm bg-purple-100 flex items-center justify-center">
//                 <User className="w-4 h-4 text-purple-600" />
//               </div>
//               <CardTitle className="text-base font-semibold text-slate-800">
//                 Profile Settings
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4 pt-6">
//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-slate-700">
//                   Full Name
//                 </label>
//                 <Input
//                   defaultValue="John Doe"
//                   className="bg-white border-slate-200 rounded-sm focus-visible:ring-purple-500 h-10"
//                 />
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-slate-700">
//                   Email Address
//                 </label>
//                 <Input
//                   defaultValue="john@company.com"
//                   className="bg-white border-slate-200 rounded-sm focus-visible:ring-purple-500 h-10"
//                 />
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-slate-700">
//                   Company Name
//                 </label>
//                 <Input
//                   defaultValue="My Company"
//                   className="bg-white border-slate-200 rounded-sm focus-visible:ring-purple-500 h-10"
//                 />
//               </div>
//               <div className="pt-2">
//                 <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-sm px-6 h-10 font-medium">
//                   Save Changes
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Bot Configuration */}
//           <Card className="border-slate-200 shadow-sm rounded-sm bg-white">
//             <CardHeader className="flex flex-row items-center gap-3 pb-4 border-b border-slate-100">
//               <div className="w-8 h-8 rounded-sm bg-purple-100 flex items-center justify-center">
//                 <Zap className="w-4 h-4 text-purple-600" />
//               </div>
//               <CardTitle className="text-base font-semibold text-slate-800">
//                 Bot Configuration
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4 pt-6">
//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-slate-700">
//                   Bot Name
//                 </label>
//                 <Input
//                   defaultValue="Support Bot"
//                   className="bg-white border-slate-200 rounded-sm focus-visible:ring-purple-500 h-10"
//                 />
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-slate-700">
//                   Response Tone
//                 </label>
//                 <Input
//                   placeholder="e.g. Professional, Friendly"
//                   className="bg-white border-slate-200 rounded-sm focus-visible:ring-purple-500 h-10"
//                 />
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-slate-700">
//                   Max Response Length
//                 </label>
//                 <Input
//                   placeholder="e.g. 150 words"
//                   className="bg-white border-slate-200 rounded-sm focus-visible:ring-purple-500 h-10"
//                 />
//               </div>
//               <div className="flex items-center justify-between pt-2 bg-[#E9DFFC33] px-3 py-2 rounded-sm">
//                 <div className="space-y-0.5">
//                   <label className="text-sm font-medium text-slate-700 block">
//                     Auto-resolve
//                   </label>
//                   <span className="text-xs text-slate-500">
//                     After 24h inactivity
//                   </span>
//                 </div>
//                 <Switch
//                   checked={autoResolve}
//                   onCheckedChange={setAutoResolve}
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           {/* Notifications */}
//           <Card className="border-slate-200 shadow-sm rounded-sm bg-white col-span-2">
//             <CardHeader className="flex flex-row items-center gap-3 pb-4 border-b border-slate-100">
//               <div className="w-8 h-8 rounded-sm bg-purple-100 flex items-center justify-center">
//                 <Bell className="w-4 h-4 text-purple-600" />
//               </div>
//               <CardTitle className="text-base font-semibold text-slate-800">
//                 Notifications
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6 pt-6">
//               <div className="flex items-center justify-between bg-[#E9DFFC33] p-3 rounded-sm">
//                 <div className="space-y-0.5">
//                   <label className="text-sm font-medium text-slate-700 block bg">
//                     Email notifications
//                   </label>
//                   <span className="text-xs text-slate-500">
//                     Receive email alerts for new conversations
//                   </span>
//                 </div>
//                 <Switch
//                   checked={emailNotifs}
//                   onCheckedChange={setEmailNotifs}
//                 />
//               </div>
//               <div className="flex items-center justify-between bg-[#E9DFFC33] p-3 rounded-sm">
//                 <div className="space-y-0.5">
//                   <label className="text-sm font-medium text-slate-700 block">
//                     Weekly reports
//                   </label>
//                   <span className="text-xs text-slate-500">
//                     Receive weekly performance summaries
//                   </span>
//                 </div>
//                 <Switch
//                   checked={weeklyReports}
//                   onCheckedChange={setWeeklyReports}
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           {/* Security */}
//           <Card className="border-slate-200 shadow-sm rounded-sm bg-white">
//             <CardHeader className="flex flex-row items-center gap-3 pb-4 border-b border-slate-100">
//               <div className="w-8 h-8 rounded-sm bg-purple-100 flex items-center justify-center">
//                 <Shield className="w-4 h-4 text-purple-600" />
//               </div>
//               <CardTitle className="text-base font-semibold text-slate-800">
//                 Security
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3 pt-6">
//               <div className="group flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-sm cursor-pointer transition-colors">
//                 <span className="text-sm font-medium text-purple-700">
//                   Change Password
//                 </span>
//               </div>
//               <div className="group flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-sm cursor-pointer transition-colors">
//                 <span className="text-sm font-medium text-purple-700">
//                   Enable Two-Factor Authentication
//                 </span>
//               </div>
//               <div className="group flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-sm cursor-pointer transition-colors">
//                 <span className="text-sm font-medium text-purple-700">
//                   API Keys
//                 </span>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Billing & Plan */}
//           <Card className="border-slate-200 shadow-sm rounded-sm bg-white">
//             <CardHeader className="flex flex-row items-center gap-3 pb-4 border-b border-slate-100">
//               <div className="w-8 h-8 rounded-sm bg-green-100 flex items-center justify-center">
//                 <CreditCard className="w-4 h-4 text-green-600" />
//               </div>
//               <CardTitle className="text-base font-semibold text-slate-800">
//                 Billing & Plan
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4 pt-6">
//               <div className="p-4 border border-slate-100 rounded-sm bg-slate-50 flex items-center justify-between">
//                 <div>
//                   <div className="text-sm font-semibold text-slate-900">
//                     Current Plan: Professional
//                   </div>
//                   <div className="text-xs text-slate-500 mt-1">
//                     $99/month • Next billing: Feb 15, 2024
//                   </div>
//                 </div>
//                 <Button className="bg-slate-900 hover:bg-slate-800 text-white text-xs h-8 rounded-sm">
//                   Upgrade
//                 </Button>
//               </div>

//               <div className="space-y-3 pt-2">
//                 <div className="group flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-sm cursor-pointer transition-colors">
//                   <span className="text-sm font-medium text-purple-700">
//                     View Invoices
//                   </span>
//                 </div>
//                 <div className="group flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-sm cursor-pointer transition-colors">
//                   <span className="text-sm font-medium text-purple-700">
//                     Update Payment Method
//                   </span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Email Integrations */}
//           <Card className="border-slate-200 shadow-sm rounded-sm bg-white">
//             <CardHeader className="flex flex-row items-center gap-3 pb-4 border-b border-slate-100">
//               <div className="w-8 h-8 rounded-sm bg-purple-100 flex items-center justify-center">
//                 <Mail className="w-4 h-4 text-purple-600" />
//               </div>
//               <CardTitle className="text-base font-semibold text-slate-800">
//                 Email Integrations
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6 pt-6">
//               <div className="flex items-center justify-between bg-[#E9DFFC33] p-3 rounded-sm">
//                 <div className="space-y-0.5">
//                   <label className="text-sm font-medium text-slate-700 block">
//                     New message alerts
//                   </label>
//                   <span className="text-xs text-slate-500">
//                     Get notified instantly
//                   </span>
//                 </div>
//                 <Switch
//                   checked={newMsgAlerts}
//                   onCheckedChange={setNewMsgAlerts}
//                 />
//               </div>
//               <div className="flex items-center justify-between bg-[#E9DFFC33] p-3 rounded-sm">
//                 <div className="space-y-0.5">
//                   <label className="text-sm font-medium text-slate-700 block">
//                     Escalation alerts
//                   </label>
//                   <span className="text-xs text-slate-500">
//                     High-priority issues
//                   </span>
//                 </div>
//                 <Switch
//                   checked={escalationAlerts}
//                   onCheckedChange={setEscalationAlerts}
//                 />
//               </div>
//               <div className="flex items-center justify-between bg-[#E9DFFC33] p-3 rounded-sm">
//                 <div className="space-y-0.5">
//                   <label className="text-sm font-medium text-slate-700 block">
//                     Email-to-conversation
//                   </label>
//                   <span className="text-xs text-slate-500">
//                     Create chats from emails
//                   </span>
//                 </div>
//                 <Switch
//                   checked={emailToConv}
//                   onCheckedChange={setEmailToConv}
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           {/* Scheduling Integrations */}
//           <Card className="border-slate-200 shadow-sm rounded-sm bg-white">
//             <CardHeader className="flex flex-row items-center gap-3 pb-4 border-b border-slate-100">
//               <div className="w-8 h-8 rounded-sm bg-purple-100 flex items-center justify-center">
//                 <Calendar className="w-4 h-4 text-purple-600" />
//               </div>
//               <CardTitle className="text-base font-semibold text-slate-800">
//                 Scheduling Integrations
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6 pt-6">
//               <div className="p-4 border border-slate-100 rounded-sm">
//                 <div className="mb-3">
//                   <div className="text-sm font-medium text-slate-900">
//                     Calendly
//                   </div>
//                   <div className="text-xs text-slate-500">Not connected</div>
//                 </div>
//                 <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white h-9 rounded-sm text-sm">
//                   Connect Calendly
//                 </Button>
//               </div>

//               <div className="p-4 border border-slate-100 rounded-sm">
//                 <div className="mb-3">
//                   <div className="text-sm font-medium text-slate-900">
//                     Google Calendar
//                   </div>
//                   <div className="text-xs text-slate-500">Not connected</div>
//                 </div>
//                 <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white h-9 rounded-sm text-sm">
//                   Connect Google Calendar
//                 </Button>
//               </div>

//               <div className="px-1">
//                 <p className="text-[10px] text-slate-400">
//                   Booking details will appear directly in conversations once
//                   connected
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Danger Zone */}
//         <div className="border border-red-200 rounded-sm bg-white overflow-hidden">
//           <div className="px-6 py-4 border-b border-red-100 bg-red-50/30">
//             <h3 className="text-base font-semibold text-red-600">
//               Danger Zone
//             </h3>
//           </div>
//           <div className="p-6 w-full">
//             <Button className="w-full bg-red-500 hover:bg-red-600 text-white rounded-sm h-10 px-6">
//               Delete Account
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";

const settings = () => {
  return <div>settings</div>;
};

export default settings;
