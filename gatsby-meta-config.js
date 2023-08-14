module.exports = {
  title: `seongsu.me`,
  description: `Seongsu's Blog`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://seongsu.me/`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `nfl1ryxditimo12/nfl1ryxditimo12.github.io`, // `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  ga: 'G-MHYY2H7B9N', // Google Analytics Tracking ID
  author: {
    name: `김성수`,
    bio: {
      role: `개발자`,
      description: '사람에 가치를 두는',
      thumbnail: 'thumbnail.gif', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/nfl1ryxditimo12`, // `https://github.com/zoomKoding`,
      linkedIn: `https://www.linkedin.com/in/%EC%84%B1%EC%88%98-%EA%B9%80-605b36229/`, // `https://www.linkedin.com/in/jinhyeok-jeong-800871192`,
      email: `vollz2g@gmail.com`, // `zoomkoding@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2021.11 ~ 2022.04',
        activity: '반찬 구독 플랫폼 개발',
        links: {
          github: 'https://github.com/Didyoueat/DYE_Backend',
          post:
            'https://seongsu.me/goodbye-2021/#-%EC%A7%84%ED%96%89%EC%A4%91%EC%9D%B8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8',
          googlePlay: '',
          appStore: '',
          demo: 'https://babmuk.com',
        },
      },
      {
        date: '2021.05 ~',
        activity: '42 Seoul 본과정',
        links: {
          github: 'https://github.com/innovationacademy-kr',
          post: 'https://seongsu.me/goodbye-2021/#-born2code',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: '예약 자동화 서버 개발',
        description: '공공 테니스장 예약 자동화 서버입니다.',
        techStack: ['JavaScript', 'React', 'Express', 'MySQL', 'Azure VM'],
        thumbnailUrl: 'process_design.png',
        links: {
          post: '/project/reservation-automation',
          github: 'https://github.com/KOREAparksh/TennisKing',
          googlePlay: '',
          appStore: '',
        },
      },
      {
        title: '자체 인트라넷 슬랙 알림 서비스 개발',
        description:
          '42 과정을 진행하며 교육과정 인트라넷의 알림기능에 불편함을 느껴, 42 API를 통해 새로운 이벤트가 감지되면 슬랙으로 전송해주는 서비스를 만들게 되었습니다.',
        techStack: ['TypeScript', 'Node.js', 'MySQL', 'Slack', 'EC2'],
        thumbnailUrl: '42alert.png',
        links: {
          post: '/project/42alert-retrospective',
          github: 'https://github.com/nfl1ryxditimo12/42Notifier',
          googlePlay: '',
          appStore: '',
        },
      },
    ],
  },
};
