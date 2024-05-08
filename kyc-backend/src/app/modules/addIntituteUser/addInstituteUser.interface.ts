export interface AddInstituteUserRequest {
  instituteId: string;
  userNIDs: string[];
}

export interface VerifyUserRequest {
  instituteId: string;
  nid: string;
  otp: string;
}
