import { atom } from 'recoil';

export interface CreateStudyTypes {
    image: File[];
    name: string;
    description: string;
    channel: number[]; // 온라인, 오프라인 여부
    category: number[];
    callOutTitle: string;
    callOutContents: string;
    capacity: number; // 스터디 인원
    sessionCount: number; // 스터디 횟수
    isApproval: boolean; // 승인제 여부
    teamAreaInfoId: number; // 지역 정보 (사용 X)
    recruitStartDate: string; // 모집 시작 일시
    recruitEndDate: string; // 모집 종료 일시
    isRecruit: boolean; // 추가 모집 여부
    startDate: string; // 스터디 시작 일시
    endDate: string; // 스터디 종료 일시
}

export const CreateStudyState = atom<CreateStudyTypes>({
    key: 'createStudy',
    default: {
        image: [],
        name: '',
        description: '',
        channel: [1, 0],
        category: [],
        callOutTitle: '',
        callOutContents: '',
        capacity: 2,
        sessionCount: 1,
        isApproval: false,
        teamAreaInfoId: 1,
        recruitStartDate: '',
        recruitEndDate: '',
        isRecruit: false,
        startDate: '',
        endDate: '',
    },
});
