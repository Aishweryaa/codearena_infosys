import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      language: "Language",

      dashboard: "Dashboard",
      problems: "Problems",
      submissions: "Submissions",
      leaderboard: "Leaderboard",
      profile: "Profile",
      admin: "Admin",
      logout: "Logout",

      overview: "Overview",
      manageProblems: "Manage problems",
      createProblem: "Create problem",
      manageUsers: "Manage users",
      workspace: "WORKSPACE",
      openUserPanel: "Open user panel",
      administratorWorkspace: "Administrator workspace",
      controlCenter: "CodeArena Control Center",
      systemOnline: "System online",

      landingFeatures: "Features",
      landingHowItWorks: "How it works",
      landingLanguages: "Languages",

      login: "Login",
      register: "Register",

      landingPill: "Practice. Execute. Improve.",
      landingHeroFirst: "Enter the arena.",
      landingHeroSecond: "Build coding confidence.",
      landingHeroDescription:
        "CodeArena combines an IDE-like Monaco editor, Docker-powered evaluation, real-time verdicts and progress tracking in one interactive coding platform.",

      startCodingFree: "Start coding free",
      alreadyHaveAccount: "I already have an account",

      fourLanguages: "Four languages",
      dockerSandbox: "Docker sandbox",
      liveVerdicts: "Live verdicts",

      buildExecuteWith: "Build and execute with",

      everythingArena: "EVERYTHING IN ONE ARENA",
      focusedPractice:
        "Designed for focused, consistent practice",
      focusedPracticeDescription:
        "Modern tools that help learners move from reading a problem to understanding every verdict.",

      featureMonacoTitle: "Monaco coding workspace",
      featureMonacoText:
        "Write Java, Python, C++ and JavaScript in a professional VS Code-style editor.",

      featureDockerTitle: "Secure Docker execution",
      featureDockerText:
        "Run untrusted code inside isolated containers and receive reliable verdicts.",

      featureProgressTitle: "Progress that motivates",
      featureProgressText:
        "Track submissions, accepted solutions, difficulty progress and leaderboard rank.",

      featureCompeteTitle: "Compete and improve",
      featureCompeteText:
        "Practice consistently, compare performance and move up the CodeArena leaderboard.",

      howItWorks: "HOW IT WORKS",
      challengeToAccepted:
        "From challenge to accepted solution",

      chooseChallengeTitle: "Choose a challenge",
      chooseChallengeText:
        "Search and filter the problem library by title and difficulty.",

      writeRunTitle: "Write and run",
      writeRunText:
        "Use Monaco Editor and test your approach with visible cases.",

      submitSecurelyTitle: "Submit securely",
      submitSecurelyText:
        "Your solution executes inside an isolated Docker environment.",

      learnVerdictsTitle: "Learn from verdicts",
      learnVerdictsText:
        "Review test-case results, improve your code and track progress.",

      readyToStart: "READY TO START?",
      landingCtaTitle:
        "Turn today’s practice into tomorrow’s confidence.",
      landingCtaText:
        "Create your CodeArena account and begin solving challenges in minutes.",
      createFreeAccount: "Create free account",
      signIn: "Sign in",

      footerText:
        "Practice smarter. Code securely. Improve continuously.",

      accepted: "Accepted",
      testCasesPassed: "8 / 8 test cases",

      securePlatform: "Secure platform",
      loginHeroStatus: "Code · Execute · Improve",
      welcomeCodeArena: "WELCOME TO CODEARENA",

      loginHeroTitle:
        "Build your coding confidence, one challenge at a time.",

      loginHeroText:
        "Practice in a professional Monaco editor, execute code securely through Docker, and track every accepted solution.",

      fourLanguagesTitle: "4 languages",
      fourLanguagesText:
        "Java, Python, C++ and JavaScript",

      secureExecution: "Secure execution",
      secureExecutionText:
        "Docker-isolated code evaluation",

      welcomeBack: "WELCOME BACK",
      signInCodeArena: "Sign in to CodeArena",
      loginDescription:
        "Enter your account details to continue practicing.",

      emailAddress: "Email address",
      emailPlaceholder: "name@example.com",
      password: "Password",
      passwordPlaceholder: "Enter your password",

      signingIn: "Signing in...",
      continueWith: "OR CONTINUE WITH",

      newToCodeArena: "New to CodeArena?",
      createAccount: "Create an account",

      invalidCredentials: "Invalid email or password",
      googleCredentialMissing:
        "Google credential was not received",
      googleLoginFailed: "Google login failed",
      googleAuthenticationFailed:
        "Google authentication failed",

      secureRegistration: "Secure registration",
      registerHeroStatus:
        "Start your developer journey",
      createYourAccountEyebrow:
        "CREATE YOUR ACCOUNT",

      registerHeroTitle:
        "Join the arena and turn practice into progress.",

      registerHeroText:
        "Build problem-solving consistency, learn from every verdict, and improve your position on the leaderboard.",

      secureIdentity: "Secure identity",
      secureIdentityText:
        "BCrypt hashing and JWT-protected sessions.",

      professionalEditor: "Professional editor",
      professionalEditorText:
        "Write solutions using the Monaco code editor.",

      visibleProgress: "Visible progress",
      visibleProgressText:
        "Track submissions, solved problems, and score.",

      joinCodeArena: "JOIN CODEARENA",
      registerTitle: "Create your account",
      registerDescription:
        "Your first coding challenge is only a minute away.",

      username: "Username",
      usernamePlaceholder: "Choose a username",
      confirmPassword: "Confirm password",
      confirmPasswordPlaceholder:
        "Enter the password again",

      createAccountButton: "Create account",
      creatingAccount: "Creating account...",

      passwordNote:
        "Use uppercase, lowercase, number, and special character.",

      alreadyRegistered: "Already registered?",
      passwordsDoNotMatch:
        "Passwords do not match",
      registrationFailed: "Registration failed",
      dashboardLoadError: "Unable to load dashboard information",
dockerJudgeReady: "Docker judge ready",
codingWorkspace: "YOUR CODING WORKSPACE",
welcomeBackPrefix: "Welcome back,",
dashboardHeroDescription:
  "Solve challenges, submit code in multiple languages, and climb the CodeArena leaderboard.",

startSolving: "Start solving",
mySubmissions: "My submissions",
adminPanel: "Admin panel",

completed: "completed",
yourProgress: "YOUR PROGRESS",
solvedOutOf: "{{solved}} of {{available}} solved",
rankAndScore: "Rank #{{rank}} · Score {{score}}",

availableProblems: "Available problems",
availableProblemsDetail: "Challenges ready to solve",
totalSubmissions: "Total submissions",
totalSubmissionsDetail: "All coding attempts",
problemsSolved: "Problems solved",
problemsSolvedDetail: "Unique accepted challenges",
currentScore: "Current score",
leaderboardRankDetail: "Leaderboard rank: {{rank}}",

howCodeArenaWorks: "HOW CODEARENA WORKS",
solutionJourney: "Your solution journey",

chooseChallenge: "Choose a challenge",
chooseChallengeDashboardText:
  "Search and filter the problem library.",

writeSolution: "Write your solution",
writeSolutionText:
  "Use the Monaco editor with language highlighting.",

runInDocker: "Run in Docker",
runInDockerText:
  "Your code executes inside an isolated container.",

earnRank: "Earn your rank",
earnRankText:
  "Accepted solutions update your leaderboard score.",

quickActions: "QUICK ACTIONS",
continuePractice: "Continue your practice",

browseProblems: "Browse problems",
browseProblemsText: "Find your next coding challenge",

reviewSubmissions: "Review submissions",
reviewSubmissionsText:
  "Inspect verdicts and test results",

viewLeaderboard: "View leaderboard",
viewLeaderboardText:
  "Compare your progress with other coders",

problemLoadError: "Unable to load coding problems",
problemLibrary: "PROBLEM LIBRARY",
chooseNextChallenge: "Choose your next coding challenge",
problemLibraryDescription:
  "Search CodeArena problems, filter by difficulty, and open a challenge to study the statement and examples.",

problemsShown: "problems shown",
searchProblemsPlaceholder:
  "Search by title, topic, or description",

difficulty: "Difficulty",
allDifficulties: "All difficulties",
easy: "Easy",
medium: "Medium",
hard: "Hard",

noMatchingProblems: "No matching problems",
noMatchingProblemsText:
  "Try a different keyword or difficulty filter. An administrator can also create a new challenge.",

generalProgramming: "General programming",
standardLimit: "Standard limit",
viewChallenge: "View challenge",
problemSummaryFallback:
  "Open the challenge to read its complete problem statement.",
    },
  },

  ta: {
    translation: {
      language: "மொழி",

      dashboard: "முகப்புப்பலகை",
      problems: "பிரச்சினைகள்",
      submissions: "சமர்ப்பிப்புகள்",
      leaderboard: "தரவரிசை",
      profile: "சுயவிவரம்",
      admin: "நிர்வாகம்",
      logout: "வெளியேறு",

      overview: "மேலோட்டம்",
      manageProblems: "பிரச்சினைகளை நிர்வகிக்கவும்",
      createProblem: "பிரச்சினையை உருவாக்கவும்",
      manageUsers: "பயனர்களை நிர்வகிக்கவும்",
      workspace: "பணியிடம்",
      openUserPanel: "பயனர் பகுதியைத் திற",
      administratorWorkspace: "நிர்வாக பணியிடம்",
      controlCenter: "CodeArena கட்டுப்பாட்டு மையம்",
      systemOnline: "கணினி செயல்பாட்டில் உள்ளது",

      landingFeatures: "அம்சங்கள்",
      landingHowItWorks: "இது எப்படி செயல்படுகிறது",
      landingLanguages: "மொழிகள்",

      login: "உள்நுழை",
      register: "பதிவு செய்",

      landingPill:
        "பயிற்சி செய். இயக்கிப் பார். முன்னேறு.",
      landingHeroFirst: "அரங்கிற்குள் நுழையுங்கள்.",
      landingHeroSecond:
        "நிரலாக்க நம்பிக்கையை வளர்த்துக்கொள்ளுங்கள்.",

      landingHeroDescription:
        "CodeArena, Monaco எடிட்டர், Docker அடிப்படையிலான மதிப்பீடு, உடனடி முடிவுகள் மற்றும் முன்னேற்ற கண்காணிப்பை ஒரே தளத்தில் வழங்குகிறது.",

      startCodingFree:
        "இலவசமாக நிரலாக்கத்தைத் தொடங்கு",
      alreadyHaveAccount:
        "எனக்கு ஏற்கனவே கணக்கு உள்ளது",

      fourLanguages: "நான்கு மொழிகள்",
      dockerSandbox: "Docker பாதுகாப்பு சூழல்",
      liveVerdicts: "உடனடி முடிவுகள்",

      buildExecuteWith: "இவற்றுடன் நிரல்களை இயக்குங்கள்",

      everythingArena: "அனைத்தும் ஒரே அரங்கில்",
      focusedPractice:
        "கவனமான தொடர்ச்சியான பயிற்சிக்காக வடிவமைக்கப்பட்டது",

      focusedPracticeDescription:
        "ஒரு பிரச்சினையைப் படிப்பதிலிருந்து ஒவ்வொரு முடிவையும் புரிந்துகொள்வது வரை உதவும் நவீன கருவிகள்.",

      featureMonacoTitle: "Monaco நிரலாக்க பணியிடம்",
      featureMonacoText:
        "Java, Python, C++ மற்றும் JavaScript நிரல்களை VS Code போன்ற எடிட்டரில் எழுதுங்கள்.",

      featureDockerTitle: "பாதுகாப்பான Docker இயக்கம்",
      featureDockerText:
        "தனிமைப்படுத்தப்பட்ட container-களில் நிரல்களை பாதுகாப்பாக இயக்குங்கள்.",

      featureProgressTitle:
        "முன்னேற்றத்தை கண்காணிக்கவும்",
      featureProgressText:
        "சமர்ப்பிப்புகள், தீர்க்கப்பட்ட பிரச்சினைகள் மற்றும் தரவரிசையை கண்காணிக்கவும்.",

      featureCompeteTitle:
        "போட்டியிட்டு முன்னேறுங்கள்",
      featureCompeteText:
        "தொடர்ந்து பயிற்சி செய்து CodeArena தரவரிசையில் முன்னேறுங்கள்.",

      howItWorks: "இது எப்படி செயல்படுகிறது",
      challengeToAccepted:
        "சவாலிலிருந்து வெற்றிகரமான தீர்வு வரை",

      chooseChallengeTitle: "ஒரு சவாலை தேர்வு செய்",
      chooseChallengeText:
        "தலைப்பு மற்றும் கடினத்தன்மை மூலம் பிரச்சினைகளை தேடுங்கள்.",

      writeRunTitle: "எழுதி இயக்குங்கள்",
      writeRunText:
        "Monaco Editor-ல் நிரலை எழுதி sample test case-களுடன் இயக்கிப் பாருங்கள்.",

      submitSecurelyTitle:
        "பாதுகாப்பாக சமர்ப்பிக்கவும்",
      submitSecurelyText:
        "உங்கள் நிரல் தனிமைப்படுத்தப்பட்ட Docker சூழலில் இயக்கப்படும்.",

      learnVerdictsTitle:
        "முடிவுகளிலிருந்து கற்றுக்கொள்ளுங்கள்",
      learnVerdictsText:
        "Test case முடிவுகளைப் பார்த்து நிரலை மேம்படுத்தி முன்னேற்றத்தை கண்காணிக்கவும்.",

      readyToStart: "தொடங்க தயாரா?",
      landingCtaTitle:
        "இன்றைய பயிற்சியை நாளைய நம்பிக்கையாக மாற்றுங்கள்.",
      landingCtaText:
        "CodeArena கணக்கை உருவாக்கி உடனே சவால்களை தீர்க்கத் தொடங்குங்கள்.",

      createFreeAccount:
        "இலவச கணக்கை உருவாக்கவும்",
      signIn: "உள்நுழை",

      footerText:
        "சிறப்பாக பயிற்சி செய். பாதுகாப்பாக நிரலிடு. தொடர்ந்து முன்னேறு.",

      accepted: "ஏற்றுக்கொள்ளப்பட்டது",
      testCasesPassed:
        "8 / 8 சோதனை வழக்குகள்",

      securePlatform: "பாதுகாப்பான தளம்",
      loginHeroStatus:
        "நிரலிடு · இயக்கு · முன்னேறு",
      welcomeCodeArena:
        "CODEARENA-விற்கு வரவேற்கிறோம்",

      loginHeroTitle:
        "ஒவ்வொரு சவாலுடனும் உங்கள் நிரலாக்க நம்பிக்கையை வளர்த்துக்கொள்ளுங்கள்.",

      loginHeroText:
        "Monaco Editor-ல் பயிற்சி செய்து Docker மூலம் நிரலை பாதுகாப்பாக இயக்கி உங்கள் வெற்றிகரமான தீர்வுகளை கண்காணிக்கவும்.",

      fourLanguagesTitle: "4 மொழிகள்",
      fourLanguagesText:
        "Java, Python, C++ மற்றும் JavaScript",

      secureExecution: "பாதுகாப்பான இயக்கம்",
      secureExecutionText:
        "Docker மூலம் தனிமைப்படுத்தப்பட்ட நிரல் மதிப்பீடு",

      welcomeBack: "மீண்டும் வரவேற்கிறோம்",
      signInCodeArena:
        "CodeArena-வில் உள்நுழையுங்கள்",
      loginDescription:
        "தொடர்ந்து பயிற்சி செய்ய உங்கள் கணக்கு விவரங்களை உள்ளிடுங்கள்.",

      emailAddress: "மின்னஞ்சல் முகவரி",
      emailPlaceholder: "name@example.com",
      password: "கடவுச்சொல்",
      passwordPlaceholder:
        "உங்கள் கடவுச்சொல்லை உள்ளிடுங்கள்",

      signingIn: "உள்நுழைகிறது...",
      continueWith: "அல்லது இதன் மூலம் தொடரவும்",

      newToCodeArena:
        "CodeArena-க்கு புதியவரா?",
      createAccount: "கணக்கை உருவாக்கவும்",

      invalidCredentials:
        "மின்னஞ்சல் அல்லது கடவுச்சொல் தவறாக உள்ளது",
      googleCredentialMissing:
        "Google சான்று கிடைக்கவில்லை",
      googleLoginFailed:
        "Google உள்நுழைவு தோல்வியடைந்தது",
      googleAuthenticationFailed:
        "Google அங்கீகாரம் தோல்வியடைந்தது",

      secureRegistration: "பாதுகாப்பான பதிவு",
      registerHeroStatus:
        "உங்கள் developer பயணத்தைத் தொடங்குங்கள்",
      createYourAccountEyebrow:
        "உங்கள் கணக்கை உருவாக்குங்கள்",

      registerHeroTitle:
        "CodeArena-வில் இணைந்து பயிற்சியை முன்னேற்றமாக மாற்றுங்கள்.",

      registerHeroText:
        "பிரச்சினை தீர்க்கும் திறனை வளர்த்து ஒவ்வொரு முடிவிலிருந்தும் கற்று தரவரிசையில் முன்னேறுங்கள்.",

      secureIdentity: "பாதுகாப்பான அடையாளம்",
      secureIdentityText:
        "BCrypt password hashing மற்றும் JWT பாதுகாப்பு.",

      professionalEditor:
        "தொழில்முறை எடிட்டர்",
      professionalEditorText:
        "Monaco code editor மூலம் தீர்வுகளை எழுதுங்கள்.",

      visibleProgress:
        "தெளிவான முன்னேற்றம்",
      visibleProgressText:
        "சமர்ப்பிப்புகள், தீர்க்கப்பட்ட பிரச்சினைகள் மற்றும் மதிப்பெண்களை கண்காணிக்கவும்.",

      joinCodeArena:
        "CODEARENA-வில் இணையுங்கள்",
      registerTitle:
        "உங்கள் கணக்கை உருவாக்குங்கள்",
      registerDescription:
        "உங்கள் முதல் coding challenge ஒரு நிமிட தூரத்தில் உள்ளது.",

      username: "பயனர் பெயர்",
      usernamePlaceholder:
        "பயனர் பெயரை தேர்வு செய்யவும்",
      confirmPassword:
        "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
      confirmPasswordPlaceholder:
        "கடவுச்சொல்லை மீண்டும் உள்ளிடுங்கள்",

      createAccountButton:
        "கணக்கை உருவாக்கவும்",
      creatingAccount:
        "கணக்கு உருவாக்கப்படுகிறது...",

      passwordNote:
        "பெரிய எழுத்து, சிறிய எழுத்து, எண் மற்றும் சிறப்பு குறியை பயன்படுத்தவும்.",

      alreadyRegistered:
        "ஏற்கனவே பதிவு செய்துள்ளீர்களா?",
      passwordsDoNotMatch:
        "கடவுச்சொற்கள் பொருந்தவில்லை",
      registrationFailed:
        "பதிவு தோல்வியடைந்தது",
        dashboardLoadError:
  "முகப்புப்பலகை தகவலை ஏற்ற முடியவில்லை",

dockerJudgeReady:
  "Docker மதிப்பீட்டு அமைப்பு தயார்",

codingWorkspace:
  "உங்கள் நிரலாக்க பணியிடம்",

welcomeBackPrefix:
  "மீண்டும் வரவேற்கிறோம்,",

dashboardHeroDescription:
  "சவால்களைத் தீர்த்து, பல நிரலாக்க மொழிகளில் code சமர்ப்பித்து CodeArena தரவரிசையில் முன்னேறுங்கள்.",

startSolving:
  "தீர்க்கத் தொடங்கு",

mySubmissions:
  "எனது சமர்ப்பிப்புகள்",

adminPanel:
  "நிர்வாக பகுதி",

completed:
  "முடிந்தது",

yourProgress:
  "உங்கள் முன்னேற்றம்",

solvedOutOf:
  "{{available}} இல் {{solved}} தீர்க்கப்பட்டது",

rankAndScore:
  "தரவரிசை #{{rank}} · மதிப்பெண் {{score}}",

availableProblems:
  "கிடைக்கும் பிரச்சினைகள்",

availableProblemsDetail:
  "தீர்க்க தயாரான சவால்கள்",

totalSubmissions:
  "மொத்த சமர்ப்பிப்புகள்",

totalSubmissionsDetail:
  "அனைத்து நிரலாக்க முயற்சிகள்",

problemsSolved:
  "தீர்க்கப்பட்ட பிரச்சினைகள்",

problemsSolvedDetail:
  "வெற்றிகரமாக தீர்க்கப்பட்ட தனிப்பட்ட சவால்கள்",

currentScore:
  "தற்போதைய மதிப்பெண்",

leaderboardRankDetail:
  "தரவரிசை: {{rank}}",

howCodeArenaWorks:
  "CODEARENA எப்படி செயல்படுகிறது",

solutionJourney:
  "உங்கள் தீர்வு பயணம்",

chooseChallenge:
  "ஒரு சவாலை தேர்வு செய்",

chooseChallengeDashboardText:
  "பிரச்சினை தொகுப்பில் தேடி வடிகட்டுங்கள்.",

writeSolution:
  "உங்கள் தீர்வை எழுதுங்கள்",

writeSolutionText:
  "மொழி highlighting உடன் Monaco editor-ஐ பயன்படுத்துங்கள்.",

runInDocker:
  "Docker-ல் இயக்குங்கள்",

runInDockerText:
  "உங்கள் code தனிமைப்படுத்தப்பட்ட container-ல் இயக்கப்படும்.",

earnRank:
  "உங்கள் தரவரிசையை உயர்த்துங்கள்",

earnRankText:
  "ஏற்றுக்கொள்ளப்பட்ட தீர்வுகள் உங்கள் leaderboard மதிப்பெண்ணை புதுப்பிக்கும்.",

quickActions:
  "விரைவு செயல்கள்",

continuePractice:
  "உங்கள் பயிற்சியை தொடருங்கள்",

browseProblems:
  "பிரச்சினைகளை பார்க்கவும்",

browseProblemsText:
  "உங்கள் அடுத்த நிரலாக்க சவாலை கண்டறியுங்கள்",

reviewSubmissions:
  "சமர்ப்பிப்புகளை பரிசீலிக்கவும்",

reviewSubmissionsText:
  "முடிவுகள் மற்றும் test result-களை பார்க்கவும்",

viewLeaderboard:
  "தரவரிசையை பார்க்கவும்",

viewLeaderboardText:
  "மற்ற நிரலாளர்களுடன் உங்கள் முன்னேற்றத்தை ஒப்பிடுங்கள்",

problemLoadError:
  "நிரலாக்க பிரச்சினைகளை ஏற்ற முடியவில்லை",

problemLibrary:
  "பிரச்சினை தொகுப்பு",

chooseNextChallenge:
  "உங்கள் அடுத்த நிரலாக்க சவாலை தேர்வு செய்யுங்கள்",

problemLibraryDescription:
  "CodeArena பிரச்சினைகளை தேடி, கடினத்தன்மை அடிப்படையில் வடிகட்டி, statement மற்றும் examples-ஐ பார்க்க சவாலை திறக்கவும்.",

problemsShown:
  "பிரச்சினைகள் காட்டப்படுகின்றன",

searchProblemsPlaceholder:
  "தலைப்பு, topic அல்லது விளக்கம் மூலம் தேடவும்",

difficulty:
  "கடினத்தன்மை",

allDifficulties:
  "அனைத்து நிலைகளும்",

easy:
  "எளிது",

medium:
  "நடுத்தரம்",

hard:
  "கடினம்",

noMatchingProblems:
  "பொருந்தும் பிரச்சினைகள் இல்லை",

noMatchingProblemsText:
  "வேறு keyword அல்லது difficulty filter-ஐ முயற்சிக்கவும்.",

generalProgramming:
  "பொது நிரலாக்கம்",

standardLimit:
  "வழக்கமான நேர வரம்பு",

viewChallenge:
  "சவாலை பார்க்கவும்",
    },
  },
problemSummaryFallback:
  "முழுமையான பிரச்சினை விளக்கத்தைப் படிக்க சவாலைத் திறக்கவும்.",
  hi: {
    translation: {
      language: "भाषा",

      dashboard: "डैशबोर्ड",
      problems: "समस्याएँ",
      submissions: "सबमिशन",
      leaderboard: "लीडरबोर्ड",
      profile: "प्रोफ़ाइल",
      admin: "एडमिन",
      logout: "लॉग आउट",

      overview: "अवलोकन",
      manageProblems: "समस्याएँ प्रबंधित करें",
      createProblem: "समस्या बनाएँ",
      manageUsers: "उपयोगकर्ता प्रबंधित करें",
      workspace: "कार्यस्थान",
      openUserPanel: "यूज़र पैनल खोलें",
      administratorWorkspace: "एडमिन कार्यस्थान",
      controlCenter: "CodeArena नियंत्रण केंद्र",
      systemOnline: "सिस्टम ऑनलाइन",

      landingFeatures: "विशेषताएँ",
      landingHowItWorks: "यह कैसे काम करता है",
      landingLanguages: "भाषाएँ",

      login: "लॉगिन",
      register: "रजिस्टर",

      landingPill: "अभ्यास करें। चलाएँ। सुधारें।",
      landingHeroFirst: "अरीना में प्रवेश करें।",
      landingHeroSecond:
        "कोडिंग आत्मविश्वास बढ़ाएँ।",

      landingHeroDescription:
        "CodeArena Monaco Editor, Docker आधारित मूल्यांकन, तुरंत परिणाम और प्रगति ट्रैकिंग को एक ही इंटरैक्टिव प्लेटफ़ॉर्म पर प्रदान करता है।",

      startCodingFree:
        "मुफ़्त कोडिंग शुरू करें",
      alreadyHaveAccount:
        "मेरे पास पहले से खाता है",

      fourLanguages: "चार भाषाएँ",
      dockerSandbox: "Docker सैंडबॉक्स",
      liveVerdicts: "तुरंत परिणाम",

      buildExecuteWith: "इनके साथ कोड चलाएँ",

      everythingArena:
        "सब कुछ एक ही अरीना में",
      focusedPractice:
        "केंद्रित और नियमित अभ्यास के लिए बनाया गया",

      focusedPracticeDescription:
        "समस्या पढ़ने से लेकर हर परिणाम समझने तक आपकी सहायता करने वाले आधुनिक उपकरण।",

      featureMonacoTitle:
        "Monaco कोडिंग कार्यस्थान",
      featureMonacoText:
        "Java, Python, C++ और JavaScript को VS Code जैसे एडिटर में लिखें।",

      featureDockerTitle:
        "सुरक्षित Docker निष्पादन",
      featureDockerText:
        "अलग containers में कोड सुरक्षित रूप से चलाएँ।",

      featureProgressTitle:
        "प्रगति जो प्रेरित करे",
      featureProgressText:
        "सबमिशन, हल की गई समस्याएँ और लीडरबोर्ड रैंक ट्रैक करें।",

      featureCompeteTitle:
        "प्रतिस्पर्धा करें और सुधारें",
      featureCompeteText:
        "नियमित अभ्यास करें और CodeArena लीडरबोर्ड में आगे बढ़ें।",

      howItWorks: "यह कैसे काम करता है",
      challengeToAccepted:
        "चुनौती से सफल समाधान तक",

      chooseChallengeTitle:
        "चुनौती चुनें",
      chooseChallengeText:
        "शीर्षक और कठिनाई के अनुसार समस्याएँ खोजें।",

      writeRunTitle: "लिखें और चलाएँ",
      writeRunText:
        "Monaco Editor में कोड लिखें और sample cases से जाँचें।",

      submitSecurelyTitle:
        "सुरक्षित रूप से सबमिट करें",
      submitSecurelyText:
        "आपका समाधान अलग Docker वातावरण में चलता है।",

      learnVerdictsTitle:
        "परिणामों से सीखें",
      learnVerdictsText:
        "Test-case परिणाम देखें, कोड सुधारें और प्रगति ट्रैक करें।",

      readyToStart: "शुरू करने के लिए तैयार?",
      landingCtaTitle:
        "आज के अभ्यास को कल के आत्मविश्वास में बदलें।",
      landingCtaText:
        "CodeArena खाता बनाएँ और कुछ ही मिनटों में चुनौतियाँ हल करना शुरू करें।",

      createFreeAccount:
        "मुफ़्त खाता बनाएँ",
      signIn: "साइन इन",

      footerText:
        "स्मार्ट अभ्यास करें। सुरक्षित कोड करें। लगातार सुधारें।",

      accepted: "स्वीकृत",
      testCasesPassed:
        "8 / 8 टेस्ट केस",

      securePlatform: "सुरक्षित प्लेटफ़ॉर्म",
      loginHeroStatus:
        "कोड · चलाएँ · सुधारें",
      welcomeCodeArena:
        "CODEARENA में आपका स्वागत है",

      loginHeroTitle:
        "हर चुनौती के साथ अपना कोडिंग आत्मविश्वास बढ़ाएँ।",

      loginHeroText:
        "Monaco Editor में अभ्यास करें, Docker के माध्यम से कोड सुरक्षित रूप से चलाएँ और सफल समाधानों को ट्रैक करें।",

      fourLanguagesTitle: "4 भाषाएँ",
      fourLanguagesText:
        "Java, Python, C++ और JavaScript",

      secureExecution:
        "सुरक्षित निष्पादन",
      secureExecutionText:
        "Docker आधारित अलग कोड मूल्यांकन",

      welcomeBack: "वापसी पर स्वागत है",
      signInCodeArena:
        "CodeArena में साइन इन करें",
      loginDescription:
        "अभ्यास जारी रखने के लिए अपने खाते का विवरण दर्ज करें।",

      emailAddress: "ईमेल पता",
      emailPlaceholder: "name@example.com",
      password: "पासवर्ड",
      passwordPlaceholder:
        "अपना पासवर्ड दर्ज करें",

      signingIn: "साइन इन हो रहा है...",
      continueWith: "या इसके साथ जारी रखें",

      newToCodeArena:
        "CodeArena पर नए हैं?",
      createAccount: "खाता बनाएँ",

      invalidCredentials:
        "ईमेल या पासवर्ड गलत है",
      googleCredentialMissing:
        "Google क्रेडेंशियल प्राप्त नहीं हुआ",
      googleLoginFailed:
        "Google लॉगिन विफल हुआ",
      googleAuthenticationFailed:
        "Google प्रमाणीकरण विफल हुआ",

      secureRegistration:
        "सुरक्षित पंजीकरण",
      registerHeroStatus:
        "अपनी डेवलपर यात्रा शुरू करें",
      createYourAccountEyebrow:
        "अपना खाता बनाएँ",

      registerHeroTitle:
        "अरीना में शामिल हों और अभ्यास को प्रगति में बदलें।",

      registerHeroText:
        "समस्या हल करने की निरंतरता बनाएँ, हर परिणाम से सीखें और लीडरबोर्ड में आगे बढ़ें।",

      secureIdentity: "सुरक्षित पहचान",
      secureIdentityText:
        "BCrypt hashing और JWT सुरक्षित sessions।",

      professionalEditor:
        "प्रोफ़ेशनल एडिटर",
      professionalEditorText:
        "Monaco code editor में समाधान लिखें।",

      visibleProgress: "स्पष्ट प्रगति",
      visibleProgressText:
        "सबमिशन, हल समस्याएँ और स्कोर ट्रैक करें।",

      joinCodeArena:
        "CODEARENA में शामिल हों",
      registerTitle: "अपना खाता बनाएँ",
      registerDescription:
        "आपकी पहली coding challenge केवल एक मिनट दूर है।",

      username: "यूज़रनेम",
      usernamePlaceholder:
        "यूज़रनेम चुनें",
      confirmPassword:
        "पासवर्ड की पुष्टि करें",
      confirmPasswordPlaceholder:
        "पासवर्ड फिर से दर्ज करें",

      createAccountButton: "खाता बनाएँ",
      creatingAccount:
        "खाता बनाया जा रहा है...",

      passwordNote:
        "अपरकेस, लोअरकेस, संख्या और विशेष वर्ण का उपयोग करें।",

      alreadyRegistered:
        "पहले से पंजीकृत हैं?",
      passwordsDoNotMatch:
        "पासवर्ड मेल नहीं खाते",
      registrationFailed:
        "पंजीकरण विफल हुआ",
        dashboardLoadError:
  "डैशबोर्ड जानकारी लोड नहीं हो सकी",

dockerJudgeReady:
  "Docker जज तैयार है",

codingWorkspace:
  "आपका कोडिंग कार्यस्थान",

welcomeBackPrefix:
  "वापसी पर स्वागत है,",

dashboardHeroDescription:
  "चुनौतियाँ हल करें, कई भाषाओं में कोड सबमिट करें और CodeArena लीडरबोर्ड में आगे बढ़ें।",

startSolving:
  "हल करना शुरू करें",

mySubmissions:
  "मेरे सबमिशन",

adminPanel:
  "एडमिन पैनल",

completed:
  "पूर्ण",

yourProgress:
  "आपकी प्रगति",

solvedOutOf:
  "{{available}} में से {{solved}} हल",

rankAndScore:
  "रैंक #{{rank}} · स्कोर {{score}}",

availableProblems:
  "उपलब्ध समस्याएँ",

availableProblemsDetail:
  "हल करने के लिए तैयार चुनौतियाँ",

totalSubmissions:
  "कुल सबमिशन",

totalSubmissionsDetail:
  "सभी कोडिंग प्रयास",

problemsSolved:
  "हल की गई समस्याएँ",

problemsSolvedDetail:
  "स्वीकृत विशिष्ट चुनौतियाँ",

currentScore:
  "वर्तमान स्कोर",

leaderboardRankDetail:
  "लीडरबोर्ड रैंक: {{rank}}",

howCodeArenaWorks:
  "CODEARENA कैसे काम करता है",

solutionJourney:
  "आपकी समाधान यात्रा",

chooseChallenge:
  "चुनौती चुनें",

chooseChallengeDashboardText:
  "समस्या लाइब्रेरी में खोजें और फ़िल्टर करें।",

writeSolution:
  "अपना समाधान लिखें",

writeSolutionText:
  "भाषा highlighting के साथ Monaco editor का उपयोग करें।",

runInDocker:
  "Docker में चलाएँ",

runInDockerText:
  "आपका कोड एक अलग container में चलता है।",

earnRank:
  "अपनी रैंक बढ़ाएँ",

earnRankText:
  "स्वीकृत समाधान आपके leaderboard score को अपडेट करते हैं।",

quickActions:
  "त्वरित कार्य",

continuePractice:
  "अपना अभ्यास जारी रखें",

browseProblems:
  "समस्याएँ देखें",

browseProblemsText:
  "अपनी अगली coding challenge खोजें",

reviewSubmissions:
  "सबमिशन देखें",

reviewSubmissionsText:
  "Verdicts और test results देखें",

viewLeaderboard:
  "लीडरबोर्ड देखें",

viewLeaderboardText:
  "अन्य coders के साथ अपनी प्रगति की तुलना करें",

problemLoadError:
  "कोडिंग समस्याएँ लोड नहीं हो सकीं",

problemLibrary:
  "समस्या लाइब्रेरी",

chooseNextChallenge:
  "अपनी अगली coding challenge चुनें",

problemLibraryDescription:
  "CodeArena समस्याएँ खोजें, कठिनाई के अनुसार फ़िल्टर करें और statement तथा examples देखने के लिए challenge खोलें।",

problemsShown:
  "समस्याएँ दिखाई गईं",

searchProblemsPlaceholder:
  "शीर्षक, topic या विवरण से खोजें",

difficulty:
  "कठिनाई",

allDifficulties:
  "सभी कठिनाइयाँ",

easy:
  "आसान",

medium:
  "मध्यम",

hard:
  "कठिन",

noMatchingProblems:
  "कोई मेल खाती समस्या नहीं",

noMatchingProblemsText:
  "अलग keyword या difficulty filter आज़माएँ।",

generalProgramming:
  "सामान्य प्रोग्रामिंग",

standardLimit:
  "मानक सीमा",

viewChallenge:
  "चुनौती देखें",
    },
  },
  problemSummaryFallback:
  "पूरी समस्या का विवरण पढ़ने के लिए चुनौती खोलें।",

  te: {
    translation: {
      language: "భాష",

      dashboard: "డాష్‌బోర్డ్",
      problems: "సమస్యలు",
      submissions: "సమర్పణలు",
      leaderboard: "లీడర్‌బోర్డ్",
      profile: "ప్రొఫైల్",
      admin: "అడ్మిన్",
      logout: "లాగ్ అవుట్",

      overview: "అవలోకనం",
      manageProblems: "సమస్యలను నిర్వహించండి",
      createProblem: "సమస్యను సృష్టించండి",
      manageUsers: "వినియోగదారులను నిర్వహించండి",
      workspace: "పని ప్రదేశం",
      openUserPanel: "యూజర్ ప్యానెల్ తెరవండి",
      administratorWorkspace: "అడ్మిన్ పని ప్రదేశం",
      controlCenter: "CodeArena నియంత్రణ కేంద్రం",
      systemOnline: "సిస్టమ్ ఆన్‌లైన్",

      landingFeatures: "ఫీచర్లు",
      landingHowItWorks: "ఇది ఎలా పనిచేస్తుంది",
      landingLanguages: "భాషలు",

      login: "లాగిన్",
      register: "రిజిస్టర్",

      landingPill:
        "అభ్యాసం చేయండి. రన్ చేయండి. మెరుగుపరచండి.",
      landingHeroFirst: "అరీనాలోకి ప్రవేశించండి.",
      landingHeroSecond:
        "కోడింగ్ విశ్వాసాన్ని పెంచుకోండి.",

      landingHeroDescription:
        "CodeArena Monaco Editor, Docker ఆధారిత మూల్యాంకనం, తక్షణ ఫలితాలు మరియు పురోగతి ట్రాకింగ్‌ను ఒకే ఇంటరాక్టివ్ ప్లాట్‌ఫారమ్‌లో అందిస్తుంది.",

      startCodingFree:
        "ఉచితంగా కోడింగ్ ప్రారంభించండి",
      alreadyHaveAccount:
        "నాకు ఇప్పటికే ఖాతా ఉంది",

      fourLanguages: "నాలుగు భాషలు",
      dockerSandbox: "Docker సాండ్‌బాక్స్",
      liveVerdicts: "తక్షణ ఫలితాలు",

      buildExecuteWith:
        "వీటితో కోడ్ రన్ చేయండి",

      everythingArena:
        "అన్నీ ఒకే అరీనాలో",
      focusedPractice:
        "దృష్టి కేంద్రీకృత నిరంతర అభ్యాసం కోసం రూపొందించబడింది",

      focusedPracticeDescription:
        "సమస్యను చదవడం నుండి ప్రతి ఫలితాన్ని అర్థం చేసుకోవడం వరకు సహాయపడే ఆధునిక సాధనాలు.",

      featureMonacoTitle:
        "Monaco కోడింగ్ వర్క్‌స్పేస్",
      featureMonacoText:
        "Java, Python, C++ మరియు JavaScript ను VS Code తరహా ఎడిటర్‌లో రాయండి.",

      featureDockerTitle:
        "సురక్షిత Docker అమలు",
      featureDockerText:
        "వేరు చేసిన containers లో కోడ్‌ను సురక్షితంగా అమలు చేయండి.",

      featureProgressTitle:
        "ప్రేరణనిచ్చే పురోగతి",
      featureProgressText:
        "సమర్పణలు, పరిష్కరించిన సమస్యలు మరియు లీడర్‌బోర్డ్ ర్యాంకును ట్రాక్ చేయండి.",

      featureCompeteTitle:
        "పోటీ చేసి మెరుగుపడండి",
      featureCompeteText:
        "క్రమంగా అభ్యాసం చేసి CodeArena లీడర్‌బోర్డ్‌లో ముందుకు సాగండి.",

      howItWorks: "ఇది ఎలా పనిచేస్తుంది",
      challengeToAccepted:
        "సవాలు నుండి విజయవంతమైన పరిష్కారం వరకు",

      chooseChallengeTitle:
        "ఒక సవాలును ఎంచుకోండి",
      chooseChallengeText:
        "శీర్షిక మరియు కష్టతరం ఆధారంగా సమస్యలను వెతకండి.",

      writeRunTitle: "రాసి రన్ చేయండి",
      writeRunText:
        "Monaco Editor లో కోడ్ రాసి sample cases తో పరీక్షించండి.",

      submitSecurelyTitle:
        "సురక్షితంగా సమర్పించండి",
      submitSecurelyText:
        "మీ పరిష్కారం వేరు చేసిన Docker వాతావరణంలో అమలవుతుంది.",

      learnVerdictsTitle:
        "ఫలితాల నుండి నేర్చుకోండి",
      learnVerdictsText:
        "Test-case ఫలితాలను చూసి కోడ్‌ను మెరుగుపరచి పురోగతిని ట్రాక్ చేయండి.",

      readyToStart:
        "ప్రారంభించడానికి సిద్ధమా?",
      landingCtaTitle:
        "ఈరోజు అభ్యాసాన్ని రేపటి విశ్వాసంగా మార్చండి.",
      landingCtaText:
        "CodeArena ఖాతాను సృష్టించి కొన్ని నిమిషాల్లో సవాళ్లను పరిష్కరించడం ప్రారంభించండి.",

      createFreeAccount:
        "ఉచిత ఖాతాను సృష్టించండి",
      signIn: "సైన్ ఇన్",

      footerText:
        "తెలివిగా అభ్యాసం చేయండి. సురక్షితంగా కోడ్ చేయండి. నిరంతరం మెరుగుపడండి.",

      accepted: "ఆమోదించబడింది",
      testCasesPassed:
        "8 / 8 టెస్ట్ కేసులు",

      securePlatform:
        "సురక్షిత ప్లాట్‌ఫారమ్",
      loginHeroStatus:
        "కోడ్ · రన్ · మెరుగుపరచండి",
      welcomeCodeArena:
        "CODEARENA కు స్వాగతం",

      loginHeroTitle:
        "ప్రతి సవాలుతో మీ కోడింగ్ విశ్వాసాన్ని పెంచుకోండి.",

      loginHeroText:
        "Monaco Editor లో అభ్యాసం చేసి Docker ద్వారా కోడ్‌ను సురక్షితంగా అమలు చేసి విజయవంతమైన పరిష్కారాలను ట్రాక్ చేయండి.",

      fourLanguagesTitle: "4 భాషలు",
      fourLanguagesText:
        "Java, Python, C++ మరియు JavaScript",

      secureExecution:
        "సురక్షిత అమలు",
      secureExecutionText:
        "Docker ద్వారా వేరు చేసిన కోడ్ మూల్యాంకనం",

      welcomeBack: "తిరిగి స్వాగతం",
      signInCodeArena:
        "CodeArena లో సైన్ ఇన్ చేయండి",
      loginDescription:
        "అభ్యాసం కొనసాగించడానికి మీ ఖాతా వివరాలను నమోదు చేయండి.",

      emailAddress: "ఇమెయిల్ చిరునామా",
      emailPlaceholder: "name@example.com",
      password: "పాస్‌వర్డ్",
      passwordPlaceholder:
        "మీ పాస్‌వర్డ్ నమోదు చేయండి",

      signingIn: "సైన్ ఇన్ అవుతోంది...",
      continueWith:
        "లేదా దీనితో కొనసాగించండి",

      newToCodeArena:
        "CodeArena కు కొత్తవారా?",
      createAccount: "ఖాతాను సృష్టించండి",

      invalidCredentials:
        "ఇమెయిల్ లేదా పాస్‌వర్డ్ తప్పుగా ఉంది",
      googleCredentialMissing:
        "Google credential అందలేదు",
      googleLoginFailed:
        "Google లాగిన్ విఫలమైంది",
      googleAuthenticationFailed:
        "Google authentication విఫలమైంది",

      secureRegistration:
        "సురక్షిత నమోదు",
      registerHeroStatus:
        "మీ developer ప్రయాణాన్ని ప్రారంభించండి",
      createYourAccountEyebrow:
        "మీ ఖాతాను సృష్టించండి",

      registerHeroTitle:
        "అరీనాలో చేరి అభ్యాసాన్ని పురోగతిగా మార్చండి.",

      registerHeroText:
        "సమస్య పరిష్కారంలో స్థిరత్వాన్ని పెంచి ప్రతి ఫలితం నుండి నేర్చుకుని లీడర్‌బోర్డ్‌లో ముందుకు సాగండి.",

      secureIdentity: "సురక్షిత గుర్తింపు",
      secureIdentityText:
        "BCrypt hashing మరియు JWT రక్షిత sessions.",

      professionalEditor:
        "ప్రొఫెషనల్ ఎడిటర్",
      professionalEditorText:
        "Monaco code editor ఉపయోగించి పరిష్కారాలను రాయండి.",

      visibleProgress:
        "కనిపించే పురోగతి",
      visibleProgressText:
        "సమర్పణలు, పరిష్కరించిన సమస్యలు మరియు స్కోర్‌ను ట్రాక్ చేయండి.",

      joinCodeArena:
        "CODEARENA లో చేరండి",
      registerTitle:
        "మీ ఖాతాను సృష్టించండి",
      registerDescription:
        "మీ మొదటి coding challenge కేవలం ఒక నిమిషం దూరంలో ఉంది.",

      username: "యూజర్‌నేమ్",
      usernamePlaceholder:
        "యూజర్‌నేమ్ ఎంచుకోండి",
      confirmPassword:
        "పాస్‌వర్డ్ నిర్ధారించండి",
      confirmPasswordPlaceholder:
        "పాస్‌వర్డ్ మళ్లీ నమోదు చేయండి",

      createAccountButton:
        "ఖాతాను సృష్టించండి",
      creatingAccount:
        "ఖాతా సృష్టించబడుతోంది...",

      passwordNote:
        "పెద్ద అక్షరం, చిన్న అక్షరం, సంఖ్య మరియు ప్రత్యేక అక్షరాన్ని ఉపయోగించండి.",

      alreadyRegistered:
        "ఇప్పటికే నమోదు చేసుకున్నారా?",
      passwordsDoNotMatch:
        "పాస్‌వర్డ్‌లు సరిపోలడం లేదు",
      registrationFailed:
        "నమోదు విఫలమైంది",
        dashboardLoadError:
  "డాష్‌బోర్డ్ సమాచారాన్ని లోడ్ చేయలేకపోయాము",

dockerJudgeReady:
  "Docker జడ్జ్ సిద్ధంగా ఉంది",

codingWorkspace:
  "మీ కోడింగ్ వర్క్‌స్పేస్",

welcomeBackPrefix:
  "తిరిగి స్వాగతం,",

dashboardHeroDescription:
  "సవాళ్లను పరిష్కరించండి, అనేక భాషల్లో code సమర్పించండి మరియు CodeArena leaderboard లో ముందుకు సాగండి.",

startSolving:
  "పరిష్కరించడం ప్రారంభించండి",

mySubmissions:
  "నా సమర్పణలు",

adminPanel:
  "అడ్మిన్ ప్యానెల్",

completed:
  "పూర్తయింది",

yourProgress:
  "మీ పురోగతి",

solvedOutOf:
  "{{available}} లో {{solved}} పరిష్కరించబడ్డాయి",

rankAndScore:
  "ర్యాంక్ #{{rank}} · స్కోర్ {{score}}",

availableProblems:
  "అందుబాటులో ఉన్న సమస్యలు",

availableProblemsDetail:
  "పరిష్కరించడానికి సిద్ధమైన సవాళ్లు",

totalSubmissions:
  "మొత్తం సమర్పణలు",

totalSubmissionsDetail:
  "అన్ని కోడింగ్ ప్రయత్నాలు",

problemsSolved:
  "పరిష్కరించిన సమస్యలు",

problemsSolvedDetail:
  "ఆమోదించబడిన ప్రత్యేక సవాళ్లు",

currentScore:
  "ప్రస్తుత స్కోర్",

leaderboardRankDetail:
  "లీడర్‌బోర్డ్ ర్యాంక్: {{rank}}",

howCodeArenaWorks:
  "CODEARENA ఎలా పనిచేస్తుంది",

solutionJourney:
  "మీ పరిష్కార ప్రయాణం",

chooseChallenge:
  "ఒక సవాలును ఎంచుకోండి",

chooseChallengeDashboardText:
  "సమస్యల లైబ్రరీలో శోధించి ఫిల్టర్ చేయండి.",

writeSolution:
  "మీ పరిష్కారాన్ని రాయండి",

writeSolutionText:
  "Language highlighting తో Monaco editor ఉపయోగించండి.",

runInDocker:
  "Docker లో రన్ చేయండి",

runInDockerText:
  "మీ code వేరు చేసిన container లో అమలవుతుంది.",

earnRank:
  "మీ ర్యాంక్‌ను పెంచుకోండి",

earnRankText:
  "ఆమోదించబడిన solutions మీ leaderboard score ను update చేస్తాయి.",

quickActions:
  "త్వరిత చర్యలు",

continuePractice:
  "మీ అభ్యాసాన్ని కొనసాగించండి",

browseProblems:
  "సమస్యలను చూడండి",

browseProblemsText:
  "మీ తదుపరి coding challenge ను కనుగొనండి",

reviewSubmissions:
  "సమర్పణలను పరిశీలించండి",

reviewSubmissionsText:
  "Verdicts మరియు test results ను చూడండి",

viewLeaderboard:
  "లీడర్‌బోర్డ్ చూడండి",

viewLeaderboardText:
  "ఇతర coders తో మీ పురోగతిని పోల్చండి",

problemLoadError:
  "కోడింగ్ సమస్యలను లోడ్ చేయలేకపోయాము",

problemLibrary:
  "సమస్యల లైబ్రరీ",

chooseNextChallenge:
  "మీ తదుపరి coding challenge ను ఎంచుకోండి",

problemLibraryDescription:
  "CodeArena సమస్యలను శోధించి, difficulty ఆధారంగా filter చేసి statement మరియు examples చూడటానికి challenge తెరవండి.",

problemsShown:
  "సమస్యలు చూపబడ్డాయి",

searchProblemsPlaceholder:
  "Title, topic లేదా description ద్వారా వెతకండి",

difficulty:
  "కష్టతరం",

allDifficulties:
  "అన్ని స్థాయిలు",

easy:
  "సులభం",

medium:
  "మధ్యస్థం",

hard:
  "కష్టం",

noMatchingProblems:
  "సరిపోలే సమస్యలు లేవు",

noMatchingProblemsText:
  "వేరే keyword లేదా difficulty filter ప్రయత్నించండి.",

generalProgramming:
  "సాధారణ ప్రోగ్రామింగ్",

standardLimit:
  "సాధారణ పరిమితి",

viewChallenge:
  "సవాలు చూడండి",

    },
  },
  problemSummaryFallback:
  "పూర్తి సమస్య వివరణను చదవడానికి సవాలును తెరవండి.",
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,

    fallbackLng: "en",

    supportedLngs: [
      "en",
      "ta",
      "hi",
      "te",
    ],

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: [
        "localStorage",
        "navigator",
      ],
      caches: [
        "localStorage",
      ],
    },
  });

export default i18n;