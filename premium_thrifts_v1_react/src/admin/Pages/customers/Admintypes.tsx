export interface Admin {
    id: string;
    name: string;
    email: string;
    role: 'super-admin' | 'moderator' | 'support';
    joinedDate: string;
    isActive: boolean;
  }

  export interface BannedUser {
    id: string;
    name: string;
    email: string;
    reason: string;
    bannedDate: string;
    status: 'permanent' | 'temporary';
  }