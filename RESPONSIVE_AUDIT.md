# RESPONSIVE AUDIT

Generated: 2026-11-09T12:22:26.484Z
Files scanned: 661 | Files with issues: 378

## Total risk score per role (baseline)

| Role | Score |
|---|---|
| student | 2247 |
| trainer | 3015 |
| admin | 1798 |
| superadmin | 2335 |
| shared | 4633 |

Rules: fixedWidth (x3), fixedGrid (x3), tableNoScroll (x4), fixedPos (x2), vh100 (x2), jsWidth (x2), overflowHidden (x1), smallFont (x1), hoverOnly (x1)

## student (top 30)

| # | File | Lines | Score | Hits |
|---|---|---|---|---|
| 1 | `src/legacy-pages/Student/IlmOraDemoPage.jsx` | 4609 | 399 | fixedWidth:106, fixedGrid:13, fixedPos:6, vh100:7, overflowHidden:2, smallFont:11, hoverOnly:3 |
| 2 | `src/Student/ResumeBuilder.jsx` | 7949 | 302 | fixedWidth:26, fixedGrid:6, fixedPos:9, vh100:4, overflowHidden:13, smallFont:158, hoverOnly:9 |
| 3 | `src/legacy-pages/Student/OnboardingLanding.jsx` | 1696 | 290 | fixedWidth:67, fixedGrid:23, fixedPos:3, vh100:2, jsWidth:5 |
| 4 | `src/legacy-pages/Student/OnboardingShowcase.jsx` | 1363 | 154 | fixedWidth:38, fixedGrid:8, fixedPos:5, jsWidth:3 |
| 5 | `src/Student/Assessments.jsx` | 1391 | 111 | fixedWidth:6, fixedGrid:3, vh100:1, overflowHidden:13, smallFont:62, hoverOnly:7 |
| 6 | `src/Student/SkillMap.jsx` | 2315 | 87 | fixedWidth:10, fixedPos:3, vh100:8, smallFont:35 |
| 7 | `src/Student/DashboardPage.jsx` | 1213 | 81 | fixedWidth:1, fixedGrid:2, overflowHidden:13, smallFont:56, hoverOnly:3 |
| 8 | `src/Student/StudentNotebook.jsx` | 4962 | 81 | fixedWidth:7, fixedGrid:2, fixedPos:1, vh100:2, jsWidth:2, overflowHidden:6, smallFont:36, hoverOnly:2 |
| 9 | `src/Student/MyQuizHistory.jsx` | 1364 | 69 | fixedWidth:1, vh100:5, overflowHidden:13, smallFont:40, hoverOnly:3 |
| 10 | `src/Student/Attendance.jsx` | 1159 | 62 | fixedWidth:4, fixedGrid:2, tableNoScroll:2, vh100:3, jsWidth:2, overflowHidden:3, smallFont:23 |
| 11 | `src/Student/StudentCompilerPage.jsx` | 2055 | 53 | fixedWidth:10, fixedPos:3, vh100:2, jsWidth:1, overflowHidden:3, smallFont:8 |
| 12 | `src/Student/Studentfeedback.jsx` | 567 | 53 | fixedWidth:2, fixedGrid:1, fixedPos:2, vh100:4, overflowHidden:1, smallFont:30, hoverOnly:1 |
| 13 | `src/Student/videolecctures.jsx` | 1151 | 46 | fixedWidth:3, overflowHidden:5, smallFont:31, hoverOnly:1 |
| 14 | `src/Student/certificates.jsx` | 1040 | 41 | fixedWidth:6, vh100:3, jsWidth:1, overflowHidden:3, smallFont:9, hoverOnly:3 |
| 15 | `src/Student/StudentCourseView.jsx` | 768 | 40 | fixedWidth:1, vh100:1, overflowHidden:2, smallFont:33 |
| 16 | `src/Student/Documents.jsx` | 601 | 37 | fixedWidth:2, tableNoScroll:2, fixedPos:1, overflowHidden:9, smallFont:9, hoverOnly:3 |
| 17 | `src/Student/StudentAssignments.jsx` | 1260 | 35 | fixedWidth:3, fixedPos:2, vh100:1, jsWidth:1, overflowHidden:4, smallFont:13, hoverOnly:1 |
| 18 | `src/Student/AssignmentDetail.jsx` | 741 | 34 | fixedPos:2, overflowHidden:6, smallFont:24 |
| 19 | `src/Student/AttemptQuiz.jsx` | 543 | 34 | fixedWidth:1, overflowHidden:6, smallFont:23, hoverOnly:2 |
| 20 | `src/Student/ChatWidgetButton.jsx` | 142 | 34 | fixedWidth:6, fixedPos:4, vh100:4 |
| 21 | `src/Student/LiveClasses.jsx` | 898 | 34 | fixedWidth:6, fixedGrid:3, jsWidth:1, smallFont:5 |
| 22 | `src/Student/RecordedClasses.jsx` | 822 | 30 | fixedWidth:4, vh100:1, jsWidth:1, overflowHidden:3, smallFont:10, hoverOnly:1 |
| 23 | `src/Student/StudentLiveSessions.jsx` | 439 | 29 | fixedWidth:1, vh100:2, overflowHidden:4, smallFont:17, hoverOnly:1 |
| 24 | `src/Student/StudentStudyPlanPage.jsx` | 1644 | 26 | fixedWidth:5, fixedPos:1, vh100:4, overflowHidden:1 |
| 25 | `src/Student/MyCourses.jsx` | 401 | 19 | fixedWidth:1, overflowHidden:4, smallFont:11, hoverOnly:1 |
| 26 | `src/Student/StudentEnroll.jsx` | 833 | 15 | overflowHidden:15 |
| 27 | `src/Student/StudentMeeting/pages/workspace/TaskOrbit.jsx` | 401 | 12 | fixedWidth:1, fixedPos:1, smallFont:7 |
| 28 | `src/Student/StudentMeeting/pages/workspace/InstantMeeting.jsx` | 473 | 10 | fixedWidth:1, fixedPos:1, smallFont:5 |
| 29 | `src/Student/Doubts.jsx` | 604 | 8 | vh100:2, jsWidth:2 |
| 30 | `src/Student/Settings.jsx` | 369 | 6 | jsWidth:1, overflowHidden:1, hoverOnly:3 |

## trainer (top 30)

| # | File | Lines | Score | Hits |
|---|---|---|---|---|
| 1 | `src/Trainer/LiveSessionControls.jsx` | 7098 | 224 | fixedWidth:16, fixedGrid:2, fixedPos:7, vh100:4, jsWidth:4, overflowHidden:44, smallFont:92, hoverOnly:4 |
| 2 | `src/Trainer/UploadDocuments.jsx` | 3477 | 181 | fixedWidth:10, fixedPos:6, overflowHidden:12, smallFont:113, hoverOnly:14 |
| 3 | `src/Trainer/VideoList.jsx` | 6025 | 178 | fixedWidth:6, fixedPos:4, overflowHidden:16, smallFont:132, hoverOnly:4 |
| 4 | `src/Trainer/UploadVideos.jsx` | 6329 | 174 | fixedWidth:7, fixedPos:4, overflowHidden:22, smallFont:111, hoverOnly:12 |
| 5 | `src/Trainer/Trainerfeedback.jsx` | 1283 | 125 | fixedWidth:10, fixedPos:2, vh100:1, jsWidth:2, overflowHidden:12, smallFont:72, hoverOnly:1 |
| 6 | `src/Trainer/ai-companion/AiMeetings.jsx` | 3252 | 117 | fixedWidth:2, fixedGrid:4, overflowHidden:8, smallFont:67, hoverOnly:24 |
| 7 | `src/Trainer/WhiteboardPanel.jsx` | 7550 | 113 | fixedWidth:2, fixedGrid:2, fixedPos:5, vh100:2, overflowHidden:13, smallFont:59, hoverOnly:15 |
| 8 | `src/Trainer/StudentReports.jsx` | 1274 | 111 | fixedWidth:10, fixedGrid:8, vh100:2, overflowHidden:11, smallFont:40, hoverOnly:2 |
| 9 | `src/Trainer/TrainerCompilerPage.jsx` | 2322 | 98 | fixedWidth:14, fixedPos:1, vh100:1, overflowHidden:2, smallFont:50 |
| 10 | `src/Trainer/ai-companion/AiWorkflowCreate.jsx` | 2433 | 87 | fixedWidth:9, overflowHidden:4, smallFont:47, hoverOnly:9 |
| 11 | `src/Trainer/CreateQuiz.jsx` | 1367 | 79 | fixedWidth:1, overflowHidden:6, smallFont:67, hoverOnly:3 |
| 12 | `src/Trainer/CreateAssignments.jsx` | 1816 | 78 | fixedWidth:1, fixedGrid:3, overflowHidden:13, smallFont:53 |
| 13 | `src/Trainer/TrainerCourseManagement.jsx` | 2013 | 75 | fixedWidth:5, fixedGrid:5, vh100:3, jsWidth:1, overflowHidden:2, smallFont:35 |
| 14 | `src/Trainer/BatchReports.jsx` | 586 | 69 | fixedWidth:5, fixedGrid:5, overflowHidden:7, smallFont:32 |
| 15 | `src/Trainer/StartLiveSession.jsx` | 1303 | 69 | fixedGrid:2, fixedPos:2, vh100:1, overflowHidden:9, smallFont:44, hoverOnly:4 |
| 16 | `src/Trainer/ai-companion/AiInPersonNotes.jsx` | 2609 | 66 | fixedWidth:4, overflowHidden:4, smallFont:50 |
| 17 | `src/Trainer/Attendance.jsx` | 2536 | 63 | fixedWidth:5, fixedGrid:2, vh100:1, jsWidth:2, overflowHidden:6, smallFont:30 |
| 18 | `src/Trainer/ai-companion/AiChatPanel.jsx` | 1743 | 61 | fixedWidth:7, fixedGrid:1, overflowHidden:2, smallFont:32, hoverOnly:3 |
| 19 | `src/Trainer/TrainerCourseModules.jsx` | 1833 | 60 | fixedWidth:2, fixedPos:2, vh100:2, overflowHidden:8, smallFont:36, hoverOnly:2 |
| 20 | `src/Trainer/TrainerStudyPlanPage.jsx` | 1782 | 59 | fixedWidth:8, fixedPos:1, vh100:1, overflowHidden:3, smallFont:28 |
| 21 | `src/Trainer/TrainerSkillMap.jsx` | 1262 | 53 | fixedWidth:2, vh100:3, overflowHidden:4, smallFont:36, hoverOnly:1 |
| 22 | `src/Trainer/TrainerLiveClasses/pages/StartLiveThreePanel.jsx` | 2155 | 49 | overflowHidden:2, smallFont:46, hoverOnly:1 |
| 23 | `src/Trainer/PerformanceAnalysis.jsx` | 759 | 39 | fixedWidth:4, vh100:1, jsWidth:1, overflowHidden:3, smallFont:18, hoverOnly:2 |
| 24 | `src/Trainer/EditRecordedClass.jsx` | 1023 | 38 | fixedWidth:1, vh100:3, overflowHidden:2, smallFont:27 |
| 25 | `src/Trainer/UploadRecordedVideo.jsx` | 1160 | 37 | fixedWidth:2, vh100:2, overflowHidden:4, smallFont:21, hoverOnly:2 |
| 26 | `src/Trainer/TrainerLiveClasses/index.jsx` | 360 | 35 | fixedWidth:8, fixedGrid:2, vh100:2, smallFont:1 |
| 27 | `src/Trainer/ai-companion/AiContextResourceModal.jsx` | 691 | 33 | fixedWidth:2, fixedPos:2, overflowHidden:3, smallFont:16, hoverOnly:4 |
| 28 | `src/Trainer/Batches.jsx` | 520 | 33 | fixedWidth:6, vh100:1, overflowHidden:2, smallFont:11 |
| 29 | `src/Trainer/ai-companion/AiHelpMeWrite.jsx` | 912 | 30 | fixedWidth:1, overflowHidden:3, smallFont:17, hoverOnly:7 |
| 30 | `src/Trainer/ai-companion/AiMyWorkflows.jsx` | 832 | 30 | overflowHidden:5, smallFont:18, hoverOnly:7 |

## admin (top 30)

| # | File | Lines | Score | Hits |
|---|---|---|---|---|
| 1 | `src/Admin/Adminfeedback.jsx` | 2398 | 182 | fixedWidth:5, fixedPos:2, vh100:1, overflowHidden:16, smallFont:135, hoverOnly:10 |
| 2 | `src/Admin/OrgReports.jsx` | 2657 | 142 | fixedWidth:9, fixedGrid:4, vh100:1, overflowHidden:13, smallFont:83, hoverOnly:5 |
| 3 | `src/Admin/AccessControlPage.jsx` | 3474 | 141 | fixedWidth:10, fixedPos:8, vh100:1, jsWidth:3, overflowHidden:6, smallFont:80, hoverOnly:1 |
| 4 | `src/Admin/OrganisationOverview.jsx` | 3921 | 117 | fixedWidth:8, fixedGrid:4, fixedPos:1, vh100:3, jsWidth:2, overflowHidden:10, smallFont:57, hoverOnly:2 |
| 5 | `src/Admin/DepartmentList.jsx` | 3991 | 116 | fixedWidth:8, fixedPos:2, vh100:2, overflowHidden:8, smallFont:76 |
| 6 | `src/Admin/Admincourseuploadform.jsx` | 1378 | 115 | fixedWidth:6, vh100:3, overflowHidden:11, smallFont:80 |
| 7 | `src/Admin/Branches.jsx` | 3609 | 108 | fixedWidth:8, fixedPos:2, vh100:2, overflowHidden:8, smallFont:68 |
| 8 | `src/Admin/AdminLiveSessions.jsx` | 1443 | 94 | fixedWidth:13, fixedGrid:4, vh100:3, jsWidth:1, overflowHidden:4, smallFont:31 |
| 9 | `src/Admin/AdminAttendance.jsx` | 1702 | 75 | fixedWidth:4, vh100:1, jsWidth:2, overflowHidden:3, smallFont:52, hoverOnly:2 |
| 10 | `src/Admin/AllCourses.jsx` | 1423 | 70 | fixedWidth:5, fixedPos:2, vh100:1, jsWidth:3, overflowHidden:4, smallFont:39 |
| 11 | `src/Admin/AllUsers.jsx` | 2075 | 70 | fixedWidth:4, fixedPos:1, vh100:2, overflowHidden:5, smallFont:47 |
| 12 | `src/Admin/AdminSkillDashboard.jsx` | 767 | 65 | fixedWidth:3, vh100:1, overflowHidden:4, smallFont:50 |
| 13 | `src/Admin/AdminRecordedVideos.jsx` | 615 | 54 | fixedWidth:10, fixedPos:2, vh100:1, jsWidth:1, overflowHidden:4, smallFont:12 |
| 14 | `src/Admin/OrgSettings.jsx` | 614 | 54 | fixedWidth:3, vh100:1, overflowHidden:5, smallFont:38 |
| 15 | `src/Admin/Categories.jsx` | 562 | 51 | fixedWidth:9, fixedGrid:6, fixedPos:1, vh100:1, jsWidth:1 |
| 16 | `src/Admin/CertificatesAdmin.jsx` | 1020 | 51 | fixedWidth:6, vh100:3, jsWidth:1, overflowHidden:3, smallFont:22 |
| 17 | `src/Admin/AdminBatches.jsx` | 1420 | 46 | fixedWidth:3, vh100:2, overflowHidden:4, smallFont:29 |
| 18 | `src/Admin/AdminFiles.jsx` | 1043 | 36 | fixedWidth:3, tableNoScroll:1, vh100:1, jsWidth:1, overflowHidden:2, smallFont:17 |
| 19 | `src/Admin/AdminDashboard.jsx` | 778 | 29 | fixedWidth:1, fixedGrid:2, overflowHidden:1, smallFont:19 |
| 20 | `src/Admin/CreateBatchModal.jsx` | 579 | 26 | fixedWidth:2, fixedPos:6, smallFont:8 |
| 21 | `src/Admin/AdminAssessmentSystem.jsx` | 2052 | 25 | fixedWidth:2, smallFont:18, hoverOnly:1 |
| 22 | `src/Admin/AdminVideos.jsx` | 653 | 24 | fixedWidth:2, overflowHidden:2, smallFont:16 |
| 23 | `src/Admin/UsageAnalytics.jsx` | 442 | 23 | fixedWidth:2, vh100:1, jsWidth:1, overflowHidden:3, smallFont:10 |
| 24 | `src/Admin/AdminFileList.jsx` | 675 | 17 | fixedWidth:1, fixedPos:2, overflowHidden:2, smallFont:8 |
| 25 | `src/Admin/AdminMeeting/pages/workspace/TaskOrbit.jsx` | 401 | 12 | fixedWidth:1, fixedPos:1, smallFont:7 |
| 26 | `src/Admin/AdminVideoList.jsx` | 471 | 11 | overflowHidden:2, smallFont:9 |
| 27 | `src/Admin/AdminMeeting/pages/workspace/InstantMeeting.jsx` | 473 | 10 | fixedWidth:1, fixedPos:1, smallFont:5 |
| 28 | `src/Admin/BatchStudentsPage.jsx` | 719 | 8 | overflowHidden:6, smallFont:2 |
| 29 | `src/Admin/BatchTrainerOverviewPage.jsx` | 580 | 8 | overflowHidden:4, smallFont:4 |
| 30 | `src/Admin/AdminMeeting/components/modals/WorkspaceModal.jsx` | 377 | 4 | jsWidth:2 |

## superadmin (top 30)

| # | File | Lines | Score | Hits |
|---|---|---|---|---|
| 1 | `src/SuperAdmin/admin-control/Onboardingdashboard.jsx` | 9262 | 313 | fixedWidth:10, fixedGrid:2, fixedPos:10, vh100:4, overflowHidden:35, smallFont:211, hoverOnly:3 |
| 2 | `src/SuperAdmin/admin-control/OrganizationDetailsPage.jsx` | 8573 | 299 | fixedWidth:10, fixedGrid:2, fixedPos:10, overflowHidden:23, smallFont:213, hoverOnly:7 |
| 3 | `src/SuperAdmin/admin-control/SuperAdminBatchControl.jsx` | 6795 | 212 | fixedWidth:8, vh100:6, jsWidth:2, overflowHidden:8, smallFont:164 |
| 4 | `src/SuperAdmin/settings/SendEmail.jsx` | 830 | 119 | fixedWidth:2, fixedPos:1, vh100:3, overflowHidden:11, smallFont:88, hoverOnly:6 |
| 5 | `src/SuperAdmin/admin-control/SuperAdminAttendance.jsx` | 2708 | 113 | fixedWidth:8, fixedGrid:5, fixedPos:2, vh100:2, overflowHidden:7, smallFont:59 |
| 6 | `src/SuperAdmin/admin-control/SuperAdminFeedback.jsx` | 3656 | 112 | fixedWidth:1, fixedPos:2, vh100:2, overflowHidden:8, smallFont:93 |
| 7 | `src/SuperAdmin/components/layout/TopGlobalCompanies.jsx` | 3666 | 97 | fixedWidth:3, fixedPos:4, vh100:1, overflowHidden:15, smallFont:51, hoverOnly:12 |
| 8 | `src/SuperAdmin/batch-control/BatchDetailsPage.jsx` | 913 | 91 | fixedGrid:2, overflowHidden:9, smallFont:74, hoverOnly:2 |
| 9 | `src/SuperAdmin/admin-control/OrganizationPage.jsx` | 1819 | 67 | fixedWidth:2, fixedPos:2, vh100:1, overflowHidden:4, smallFont:50, hoverOnly:1 |
| 10 | `src/SuperAdmin/dashboard/SuperAdminDashboard.jsx` | 709 | 52 | fixedWidth:4, fixedGrid:3, overflowHidden:3, smallFont:27, hoverOnly:1 |
| 11 | `src/SuperAdmin/sales-management/SalesManagement.jsx` | 2215 | 50 | fixedWidth:10, fixedPos:8, vh100:2 |
| 12 | `src/SuperAdmin/cms-management/pages/MarketingBanner.jsx` | 1008 | 48 | fixedWidth:4, fixedPos:2, overflowHidden:2, smallFont:30 |
| 13 | `src/SuperAdmin/student-control/StudentDetailsPage.jsx` | 414 | 48 | fixedGrid:5, overflowHidden:2, smallFont:31 |
| 14 | `src/SuperAdmin/featured-programs/pages/AdminWatchNowUpload.jsx` | 1833 | 47 | fixedWidth:1, fixedPos:1, vh100:1, overflowHidden:8, smallFont:32 |
| 15 | `src/SuperAdmin/trainer-control/TrainerDetailsPage.jsx` | 398 | 46 | fixedGrid:2, overflowHidden:4, smallFont:34, hoverOnly:2 |
| 16 | `src/SuperAdmin/admin-control/OrganizationAdminDetailsPage.jsx` | 417 | 45 | fixedGrid:1, overflowHidden:2, smallFont:37, hoverOnly:3 |
| 17 | `src/SuperAdmin/trainer-control/TrainerControlPage.jsx` | 648 | 45 | fixedWidth:1, fixedPos:1, overflowHidden:2, smallFont:35, hoverOnly:3 |
| 18 | `src/SuperAdmin/student-control/StudentControlPage.jsx` | 592 | 41 | fixedWidth:1, fixedPos:1, overflowHidden:3, smallFont:30, hoverOnly:3 |
| 19 | `src/SuperAdmin/admin-control/AdminControlPage.jsx` | 1030 | 39 | fixedWidth:1, fixedPos:1, overflowHidden:2, smallFont:28, hoverOnly:4 |
| 20 | `src/SuperAdmin/components/layout/SuperAdminNavbar.jsx` | 1267 | 39 | fixedWidth:4, fixedPos:2, overflowHidden:1, smallFont:22 |
| 21 | `src/SuperAdmin/cms-management/pages/PlatformOverview.jsx` | 1308 | 36 | overflowHidden:2, smallFont:33, hoverOnly:1 |
| 22 | `src/SuperAdmin/admin-control/NewOrganizationPage.jsx` | 921 | 30 | fixedWidth:1, overflowHidden:2, smallFont:25 |
| 23 | `src/SuperAdmin/settings/AuditLogs.jsx` | 194 | 28 | fixedWidth:1, fixedGrid:2, overflowHidden:1, smallFont:17, hoverOnly:1 |
| 24 | `src/SuperAdmin/cms-management/renderer/CMSRenderer.jsx` | 620 | 27 | overflowHidden:1, smallFont:26 |
| 25 | `src/SuperAdmin/admin-control/SuperAdminCourseManagement.jsx` | 1192 | 16 | fixedWidth:2, vh100:2, jsWidth:2, smallFont:2 |
| 26 | `src/SuperAdmin/cms-management/components/MediaManager.jsx` | 378 | 15 | fixedWidth:2, overflowHidden:3, smallFont:6 |
| 27 | `src/SuperAdmin/common/ResizableSlidePanel.jsx` | 390 | 14 | fixedPos:1, vh100:1, jsWidth:1, smallFont:8 |
| 28 | `src/SuperAdmin/components/layout/SuperAdminLayout.jsx` | 130 | 14 | fixedWidth:2, vh100:4 |
| 29 | `src/SuperAdmin/meetings/SuperAdminMeeting/pages/workspace/TaskOrbit.jsx` | 401 | 12 | fixedWidth:1, fixedPos:1, smallFont:7 |
| 30 | `src/SuperAdmin/cms-management/components/NavigationManager.jsx` | 326 | 10 | fixedWidth:2, smallFont:4 |

## shared (top 30)

| # | File | Lines | Score | Hits |
|---|---|---|---|---|
| 1 | `src/legacy-pages/Landing/ManagerHub.jsx` | 3150 | 355 | fixedWidth:43, fixedGrid:12, vh100:4, jsWidth:4, overflowHidden:19, smallFont:135, hoverOnly:20 |
| 2 | `src/legacy-pages/Landing/TrainerHub.jsx` | 2543 | 295 | fixedWidth:43, fixedGrid:12, vh100:1, jsWidth:4, overflowHidden:21, smallFont:92, hoverOnly:7 |
| 3 | `src/legacy-pages/Landing/StudentHub.jsx` | 3308 | 282 | fixedWidth:54, fixedGrid:10, vh100:2, overflowHidden:14, smallFont:59, hoverOnly:13 |
| 4 | `src/legacy-pages/Landing/FDEAcademy.jsx` | 2245 | 260 | fixedWidth:6, fixedPos:2, vh100:2, jsWidth:4, overflowHidden:12, smallFont:214 |
| 5 | `src/components/live/LiveRoom.jsx` | 3989 | 189 | fixedWidth:23, fixedPos:7, jsWidth:3, overflowHidden:30, smallFont:68, hoverOnly:2 |
| 6 | `src/legacy-pages/Landing/ResumeBuilderLanding.jsx` | 962 | 162 | fixedWidth:22, fixedGrid:8, fixedPos:1, vh100:1, overflowHidden:5, smallFont:57, hoverOnly:6 |
| 7 | `src/legacy-pages/Landing/platforms.jsx` | 4002 | 152 | fixedWidth:38, fixedGrid:10, fixedPos:2, vh100:2 |
| 8 | `src/legacy-pages/Landing/ILMORAGulf.jsx` | 1203 | 139 | fixedWidth:13, fixedPos:1, vh100:2, overflowHidden:16, smallFont:53, hoverOnly:25 |
| 9 | `src/legacy-pages/Landing/StudyPlanLanding.jsx` | 1109 | 120 | fixedWidth:10, fixedGrid:2, fixedPos:1, vh100:1, overflowHidden:16, smallFont:64 |
| 10 | `src/legacy-pages/Landing/IlmoraTalk.jsx` | 954 | 119 | fixedWidth:11, fixedPos:1, vh100:2, overflowHidden:12, smallFont:53, hoverOnly:15 |
| 11 | `src/legacy-pages/Company/HelpCenter.jsx` | 1475 | 115 | fixedWidth:25, fixedGrid:8, fixedPos:1, vh100:1, overflowHidden:6, smallFont:1, hoverOnly:5 |
| 12 | `src/legacy-pages/Landing/iq-test.jsx` | 5472 | 114 | fixedWidth:30, fixedGrid:2, fixedPos:2, jsWidth:7 |
| 13 | `src/legacy-pages/Landing/ToraCXAgenticCX.jsx` | 568 | 96 | fixedWidth:18, fixedGrid:14 |
| 14 | `src/legacy-pages/Landing/components/IlmDemoNavbar.jsx` | 1641 | 93 | fixedWidth:23, fixedGrid:4, fixedPos:4, vh100:1, overflowHidden:1, smallFont:1 |
| 15 | `src/legacy-pages/Landing/Schoolclass.jsx` | 2678 | 90 | fixedWidth:13, fixedGrid:16, smallFont:3 |
| 16 | `src/legacy-pages/Landing/Aicampanion.jsx` | 1924 | 89 | fixedWidth:9, fixedGrid:1, vh100:1, overflowHidden:7, smallFont:50 |
| 17 | `src/legacy-pages/Landing/LMSHomepage.jsx` | 3971 | 86 | fixedWidth:2, jsWidth:4, overflowHidden:16, smallFont:52, hoverOnly:4 |
| 18 | `src/legacy-pages/Landing/StudyAbroad.jsx` | 933 | 83 | fixedWidth:5, fixedGrid:2, fixedPos:2, vh100:1, overflowHidden:5, smallFont:41, hoverOnly:10 |
| 19 | `src/legacy-pages/About/AboutTexoraSkills.jsx` | 852 | 78 | fixedWidth:19, fixedGrid:3, overflowHidden:2, smallFont:10 |
| 20 | `src/legacy-pages/Landing/WatchNow.jsx` | 3128 | 77 | fixedWidth:2, fixedPos:2, jsWidth:4, overflowHidden:12, smallFont:45, hoverOnly:2 |
| 21 | `src/legacy-pages/Landing/Ilmora-workshops.jsx` | 2101 | 73 | fixedWidth:14, fixedPos:3, jsWidth:6, overflowHidden:1, smallFont:12 |
| 22 | `src/legacy-pages/Company/Pricing.jsx` | 877 | 64 | fixedWidth:13, fixedGrid:2, fixedPos:1, vh100:1, overflowHidden:1, smallFont:10, hoverOnly:4 |
| 23 | `src/legacy-pages/Landing/Personalitydevelopment.jsx` | 712 | 60 | fixedWidth:16, fixedGrid:1, fixedPos:1, vh100:1, jsWidth:2, hoverOnly:1 |
| 24 | `src/legacy-pages/Company/Careers.jsx` | 1034 | 55 | fixedWidth:10, fixedGrid:3, vh100:1, overflowHidden:2, smallFont:12 |
| 25 | `src/legacy-pages/Landing/hr-hub.jsx` | 767 | 54 | fixedWidth:14, fixedGrid:4 |
| 26 | `src/legacy-pages/Landing/ilmorameet.jsx` | 1609 | 52 | fixedWidth:13, fixedGrid:2, jsWidth:3, hoverOnly:1 |
| 27 | `src/legacy-pages/Company/TermsOfService.jsx` | 1210 | 51 | fixedWidth:8, fixedGrid:1, vh100:1, overflowHidden:4, smallFont:18 |
| 28 | `src/layouts/DashboardLayout.jsx` | 1025 | 50 | fixedWidth:11, fixedPos:2, vh100:1, overflowHidden:2, smallFont:6, hoverOnly:3 |
| 29 | `src/legacy-pages/common/ProfileDetailsForm.jsx` | 1069 | 49 | fixedWidth:9, fixedPos:1, overflowHidden:3, smallFont:16, hoverOnly:1 |
| 30 | `src/legacy-pages/public/IlmoraMeeting/src/components/IlmoraMeeting/MeetingRoom.jsx` | 2416 | 49 | fixedWidth:14, fixedPos:2, smallFont:3 |
