export type AnnouncementType = 'info' | 'error';

export type AnnouncementRequest = {
  type?: AnnouncementType,
  message: string,
}

export type AnnouncementContext = {
  announce: (request: AnnouncementRequest) => void;
};
