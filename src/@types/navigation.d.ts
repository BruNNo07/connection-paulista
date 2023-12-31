export declare global {
  namespace ReactNavigation{
    interface RootParamList {
      signUp: undefined;
      login: undefined;
      jobs: undefined;
      newJob: undefined;
      profile: undefined;
      jobDetails: {
        jobId: string
      }
      applications: {
        jobId: string
      }
      pdfViewer: {
        url: string
      }
    }
  }
}