import React from 'react';
import { formatInTimeZone } from 'date-fns-tz';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface SystemTrayProps {
  onCloseAllWindows?: () => void;
}

export const SystemTray = ({ onCloseAllWindows }: SystemTrayProps) => {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = formatInTimeZone(currentTime, 'America/Los_Angeles', 'h:mm a');

  return (
    <div className="flex items-center h-full bg-gradient-to-b from-blue-600 to-blue-700 px-2 space-x-4">
      <Dialog>
        <DialogTrigger>
          <img 
            src="/assets/Info.png" 
            alt="Info" 
            className="w-4 h-4 opacity-80 hover:opacity-100 cursor-pointer"
          />
        </DialogTrigger>
        <DialogContent className="fixed bg-[#ECE9D8] rounded shadow-vista-window animate-window-open border border-[#0054E3] w-[600px] p-0">
          <div className="h-8 bg-gradient-to-r from-[#0054E3] to-[#2E8AEF] rounded-t flex items-center justify-between px-2">
            <DialogTitle className="text-white font-segoe text-sm">
              About This Website
            </DialogTitle>
          </div>
          <div className="h-12 bg-gradient-to-r from-[#0054E3] to-[#2E8AEF] flex items-center justify-center space-x-2">
            <img 
              src="/assets/Windows_Smiley.png" 
              alt="Windows XP" 
              className="w-6 h-6" 
            />
            <span className="text-white font-semibold">Windows XP</span>
          </div>
          <DialogHeader className="p-6">
            <DialogDescription className="text-vista-text space-y-4">
              <p className="text-lg font-semibold text-vista-accent mb-4">
                Hey stranger! My name is Sterenn Languille, welcome to my Portfolio :D
              </p>
              <div className="space-y-2">
                <p>
                  This website is a nostalgic tribute to Windows XP, built using modern web technologies while maintaining the classic XP aesthetic. It features:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Authentic Windows XP-style UI components and interactions</li>
                  <li>Modern React and TypeScript foundation for smooth performance</li>
                  <li>Tailwind CSS for pixel-perfect styling that matches the XP look</li>
                  <li>Interactive windows system with minimize, maximize, and close functionality</li>
                </ul>
                <p className="mt-4">
                  The project aims to recreate the memorable Windows XP experience while showcasing modern web development capabilities. Every detail, from the iconic taskbar to window animations, has been carefully crafted to bring back memories of the classic operating system.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <img 
            src="/assets/Close.png" 
            alt="Close" 
            className="w-4 h-4 opacity-80 cursor-pointer hover:opacity-100"
          />
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-[#ECE9D8] border-[#0054E3]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#0054E3]">Close All Windows</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to close all open windows? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#ECE9D8] hover:bg-[#DCE9D8] border-[#0054E3]">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={onCloseAllWindows}
              className="bg-[#0054E3] hover:bg-[#2E8AEF] text-white"
            >
              Close All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="flex items-center space-x-2 text-white border-l border-blue-500 pl-4">
        <span className="text-sm">{formattedTime}</span>
      </div>
    </div>
  );
};