import React from 'react';
import SquatIcon from './squat.svg';
import { SkillType, SavedDataType } from '../src';
import { Skill } from 'models';

const lorem = 'lorem ipsum';

function FakeContent() {
  return (
    <div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: 'white', textDecoration: 'none' }}
        href="https://calisthenicsskills.com"
      >
        Click here
      </a>
    </div>
  );
}

function DummyVideo() {
  return (
    <iframe
      style={{ border: 'none' }}
      id="ytplayer"
      width="100%"
      src="https://www.youtube.com/embed/J3TjDUnlclk"
    ></iframe>
  );
}

export const legsPushData: SkillType[] = [
  {
    id: 'ass-squat',
    title: 'Assisted Squat',
    tooltip: {
      content: <FakeContent />,
    },
    children: [
      {
        id: 'parallel-squat',
        title: 'Parallel Squat',
        optional: true,
        tooltip: {
          content: lorem,
          direction: 'left',
        },
        children: [
          {
            id: 'full-squat',
            icon: SquatIcon,
            title: 'Reverse Hyperextensions',
            tooltip: {
              direction: 'right',
              content: lorem,
            },
            children: [
              {
                id: 'cossack-squat',
                icon: SquatIcon,
                title: 'Cossack Squat',
                tooltip: {
                  content: lorem,
                },
                children: [
                  {
                    id: 'ass-pistol-squat',
                    title: 'Pistol Squat (Assisted)',
                    color: 'alternative',
                    tooltip: {
                      content: <DummyVideo />,
                    },
                    children: [
                      {
                        id: 'pistol-squat',
                        icon: SquatIcon,
                        title: 'Pistol Squat',
                        tooltip: {
                          content: lorem,
                        },
                        children: [],
                      },
                    ],
                  },
                ],
              },
              {
                id: 'split-squat',
                title: 'Split Squat',
                tooltip: {
                  content: lorem,
                },
                children: [
                  {
                    id: 'bulgarian-split-squat',
                    icon: SquatIcon,
                    title: 'Bulgarian Split Squat',
                    tooltip: {
                      content: lorem,
                    },
                    children: [
                      {
                        id: 'deep-step-up',
                        title: 'Deep Step Up',
                        tooltip: {
                          content: lorem,
                        },
                        children: [],
                      },
                      {
                        id: 'beg-shrimp-squat',
                        title: 'Beginner Shrimp Squat',
                        optional: true,
                        tooltip: {
                          content: lorem,
                        },
                        children: [
                          {
                            id: 'shrimp-squat',
                            icon: SquatIcon,
                            title: 'Shrimp Squat',
                            tooltip: {
                              content: lorem,
                            },
                            children: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'something-else',
    tooltip: {
      content: 'burn those leg muscles',
    },
    title: 'Something Else',
    children: [
      {
        id: 'shrimp-squat-1',
        icon: SquatIcon,
        title: 'Shrimp Squat',
        tooltip: {
          content: lorem,
        },
        children: [],
      },
      {
        id: 'other-squat',
        icon: SquatIcon,
        title: 'Other Squat',
        tooltip: {
          content: lorem,
        },
        children: [],
      },
    ],
  },
];

export const hpSavedData: SavedDataType = {
  'ol-deadlift': {
    optional: false,
    nodeState: 'selected',
  },
  '45deg-hip-nc': {
    optional: false,
    nodeState: 'unlocked',
  },
  'nordic-curl-negative': {
    optional: false,
    nodeState: 'locked',
  },
  'nordic-curl': {
    optional: false,
    nodeState: 'locked',
  },
  'tuck-ol-nordic-curl': {
    optional: false,
    nodeState: 'locked',
  },
  'ol-nordic-curl': {
    optional: false,
    nodeState: 'locked',
  },
};

export const legsPullData: SkillType[] = [
  {
    id: 'ol-deadlift',
    tooltip: {
      content:
        "Lilith's Action Skill is Phasewalk, which allows her to turn invisible and increase her running speed. Upon entering and exiting Phasewalk, Lilith releases a Phase Blast that damages enemies around her. While in Phasewalk, Lilith cannot shoot, jump, or collect loot, and a melee attack will cause her to exit Phasewalk. Lilith's Action Skill is Phasewalk, which allows her to turn invisible and increase her running speed. Upon entering and exiting Phasewalk, Lilith releases a Phase Blast that damages enemies around her. While in Phasewalk, Lilith cannot shoot, jump, or collect loot, and a melee attack will cause her to exit Phasewalk. Lilith's Action Skill is Phasewalk, which allows her to turn invisible and increase her running speed. Upon entering and exiting Phasewalk, Lilith releases a Phase Blast that damages enemies around her. While in Phasewalk, Lilith cannot shoot, jump, or collect loot, and a melee attack will cause her to exit Phasewalk.",
    },
    title: 'One-Legged Deadlift',
    children: [
      {
        id: '45deg-hip-nc',
        tooltip: {
          content: lorem,
        },
        title: '45° Hip Nordic Curl',
        children: [
          {
            id: 'nordic-curl-negative',
            tooltip: {
              content: lorem,
            },
            title: 'Nordic Curl (Negative)',
            children: [
              {
                id: 'nordic-curl',
                icon: SquatIcon,
                tooltip: {
                  content: lorem,
                },
                title: 'Nordic Curl',
                children: [
                  {
                    id: 'tuck-ol-nordic-curl',
                    tooltip: {
                      content: lorem,
                    },
                    title: 'Tuck One-Legged Nordic Curl',
                    children: [
                      {
                        id: 'ol-nordic-curl',
                        tooltip: {
                          content: lorem,
                        },
                        title: 'One-Legged Nordic Curl',
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const pushUpData: SkillType[] = [
  {
    id: 'ipu',
    title: 'Incline Push Up',
    tooltip: {
      content: 'hi',
    },
    children: [
      {
        id: 'pu',
        color: 'alternative',
        title: 'Push Up',
        tooltip: {
          content: 'hii',
        },
        children: [
          {
            id: 'dpu',
            title: 'Diamond Push Up',
            tooltip: {
              content: 'hi',
            },
            children: [],
          },
        ],
      },
    ],
  },
];

export const webDevData = [
  {
    id: 'Computer Science',
    title: 'Computer Science',
    tooltip: { content: 'Basic of computer science' },
    icon: SquatIcon,
    children: [
      {
        id: 'HTML',
        title: 'HTML',
        tooltip: {
          content:
            'HTML basics, Forms and Validations, Conventions and Best Practices',
        },
        children: [
          {
            id: 'HTML advanced',
            title: 'HTML advanced',
            tooltip: {
              content: 'Writing Semantic HTML, Accessibility, SEO Basics',
            },
            icon: SquatIcon,
            children: [
              {
                id: 'Web Components',
                title: 'Web Components',
                tooltip: {
                  content: 'Shadow DOM, Custom Elements, HTML Templates',
                },
                icon: SquatIcon,
                children: [],
              },
            ],
          },
        ],
        icon: SquatIcon,
      },
      {
        id: 'CSS',
        title: 'CSS',
        tooltip: {
          content:
            'Learn the basics, Making Layouts, Responsive design and Media Queries',
        },
        icon: SquatIcon,
        children: [
          {
            id: 'CSS3',
            title: 'CSS3',
            tooltip: {
              content:
                'Transform, Transition, Animation, @font-face, Flex, Grid, Pseudo-selector',
            },
            icon: SquatIcon,
            children: [
              {
                id: 'CSS Architecture',
                title: 'CSS Architecture',
                tooltip: { content: 'BEM, OOCSS, SMACSS' },
                icon: SquatIcon,
                children: [],
              },
              {
                id: 'CSS Preprocessor',
                title: 'CSS Preprocessor',
                tooltip: { content: 'Sass, PostCSS, Less' },
                icon: SquatIcon,
                children: [
                  {
                    id: 'CSS Frameworks',
                    title: 'CSS Frameworks',
                    tooltip: {
                      content:
                        'Reactstrap, Material UI, Tailwind CSS, Chakra UI, Bootstrap, Materialize CSS, Bulma',
                    },
                    icon: SquatIcon,
                    children: [],
                  },
                  {
                    id: 'Modern CSS',
                    title: 'Modern CSS',
                    tooltip: {
                      content:
                        'Styled Component, CSS Modules, Styled JSX, Emotion, Radium, Glamorous',
                    },
                    icon: SquatIcon,
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'JavaScript',
        title: 'JavaScript',
        icon: SquatIcon,
        tooltip: {
          content:
            'Syntax and Basic Construct, Learn DOM Manipulation, Learn Fetch API / Ajax (XHR), ES6+ and modular JavaScript',
        },
        children: [
          {
            id: 'Framework',
            title: 'Framework',
            icon: SquatIcon,
            tooltip: { content: 'React.js, Angular, Vue.js' },
            children: [
              {
                id: 'SSR',
                title: 'SSR',
                icon: SquatIcon,
                tooltip: { content: 'Next.js, Universal, Nuxt.js' },
                children: [],
              },
            ],
          },
          {
            id: 'Type Checkers',
            title: 'Type Checkers',
            icon: SquatIcon,
            tooltip: { content: 'TypeScript, Flow' },
            children: [],
          },
        ],
      },
      {
        id: 'Node Basic',
        title: 'Node Basic',
        tooltip: { content: 'Know the basics' },
        icon: SquatIcon,
        children: [
          {
            id: 'Package Managers',
            title: 'Package Managers',
            tooltip: { content: 'NPM, Yarn' },
            icon: SquatIcon,
            children: [
              {
                id: 'GraphQL',
                title: 'GraphQL',
                icon: SquatIcon,
                tooltip: { content: 'Apollo, Relay Modern' },
                children: [],
              },
              {
                id: 'Module Bundlers',
                title: 'Module Bundlers',
                icon: SquatIcon,
                tooltip: { content: 'Webpack, Rollup, Parcel' },
                children: [
                  {
                    id: 'Test Your Apps',
                    title: 'Test Your Apps',
                    tooltip: { content: 'Mocha, Chai, Ava, Jest' },
                    icon: SquatIcon,
                    children: [],
                  },
                  {
                    id: 'Applications',
                    title: 'Applications',
                    tooltip: {
                      content: 'React Native, Flutter, Ionic, Electron',
                    },
                    icon: SquatIcon,
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: 'Static Site Generators',
            title: 'Static Site Generators',
            tooltip: { content: 'GatsbyJS, Vuepress, Jekyll, Hugo' },
            icon: SquatIcon,
            children: [],
          },
        ],
      },
      {
        id: 'Version Control System',
        title: 'Version Control System',
        tooltip: { content: 'Git, SVN' },
        icon: SquatIcon,
        children: [
          {
            id: 'Repo Hosting Services',
            title: 'Repo Hosting Services',
            tooltip: { content: 'GitHub, Gitlab, Bitbucket' },
            icon: SquatIcon,
            children: [],
          },
        ],
      },
      {
        id: 'Internet',
        title: 'Internet',
        tooltip: { content: 'DNS, HTTP, Browsers, Domain' },
        icon: SquatIcon,
        children: [
          {
            id: 'Web Security',
            title: 'Web Security',
            tooltip: { content: 'HTTPS, CORS, Attacks' },
            icon: SquatIcon,
            children: [],
          },
        ],
      },
    ],
  },
];

export const secretTree = [
  {
    id: 'A Secret Message',
    title: 'Secret',
    tooltip: { content: 'An intro to secrets' },
    icon: SquatIcon,
    children: [],
  },
];

export function createSkills(data: Skill): any[] {
  if (!data) return [];
  return data.map(skill => {
    return {
      id: skill.id,
      title: skill.name,
      children: createSkills(skill.children),
      tooltip: {
        content: skill.levels ? skill.levels[0].description : '',
      },
      learned: skill.learned,
      levels: skill.levels,
      parentId: skill.parentId,
      requiredLevel: skill.requiredLevel,
    };
  });
}

export const tree = [
  {
    id: 1,
    skillId: 'guard',
    name: 'Guard',
    requiredLevel: 0,
    type: 'Active',
    damageType: 'Physical',
    canBeCountered: false,
    job: 'Paladin',
    parentId: null,
    race: 'Human',
    createdAt: '2022-01-18T10:34:54.403Z',
    updatedAt: '2022-01-18T10:34:54.403Z',
    levels: [
      {
        id: 1,
        skillId: 1,
        lvl: 1,
        description:
          'Lao tới trước mặt vị trí 1 đồng minh trong vòng 2 tile, buff đồng  minh 10% armor tính theo armor của palladin trong 1 turn',
        manaCost: 1,
        skillConfig: null,
        createdAt: '2022-01-18T10:37:13.799Z',
        updatedAt: '2022-01-18T10:37:13.799Z',
        isLearned: true,
      },
      {
        id: 2,
        skillId: 1,
        lvl: 2,
        description:
          'Lao tới trước mặt vị trí 1 đồng minh trong vòng 3 tile, buff đồng  minh 10% armor tính theo armor của palladin trong 1 turn',
        manaCost: 1,
        skillConfig: null,
        createdAt: '2022-01-18T10:37:27.862Z',
        updatedAt: '2022-01-18T10:37:27.862Z',
        isLearned: false,
      },
      {
        id: 3,
        skillId: 1,
        lvl: 3,
        description:
          'Lao tới trước mặt vị trí 1 đồng minh trong vòng 4 tile, buff đồng  minh 10% armor tính theo armor của palladin trong 1 turn',
        manaCost: 1,
        skillConfig: null,
        createdAt: '2022-01-18T10:37:43.251Z',
        updatedAt: '2022-01-18T10:37:43.251Z',
        isLearned: false,
      },
      {
        id: 4,
        skillId: 1,
        lvl: 4,
        description:
          'Lao tới trước mặt vị trí 1 đồng minh trong vòng 5 tile, buff đồng  minh 10% armor tính theo armor của palladin trong 1 turn',
        manaCost: 1,
        skillConfig: null,
        createdAt: '2022-01-18T10:37:57.439Z',
        updatedAt: '2022-01-18T10:37:57.439Z',
        isLearned: false,
      },
      {
        id: 5,
        skillId: 1,
        lvl: 5,
        description:
          'Lao tới trước mặt vị trí 1 đồng minh trong vòng 6 tile, buff đồng  minh 10% armor tính theo armor của palladin trong 1 turn',
        manaCost: 1,
        skillConfig: null,
        createdAt: '2022-01-18T10:38:12.277Z',
        updatedAt: '2022-01-18T10:38:12.277Z',
        isLearned: false,
      },
    ],
    learned: 3,
    children: [
      {
        id: 2,
        skillId: 'shield_slam',
        name: 'Shield Slam',
        requiredLevel: 0,
        type: 'Active',
        damageType: 'Physical',
        canBeCountered: false,
        job: 'Paladin',
        parentId: 1,
        race: 'Human',
        createdAt: '2022-01-18T10:54:13.296Z',
        updatedAt: '2022-01-18T10:54:13.296Z',
        levels: [
          {
            id: 6,
            skillId: 2,
            lvl: 1,
            description:
              'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*2',
            manaCost: 1,
            skillConfig: null,
            createdAt: '2022-01-18T10:54:42.063Z',
            updatedAt: '2022-01-18T10:54:42.063Z',
            isLearned: false,
          },
          {
            id: 7,
            skillId: 2,
            lvl: 2,
            description:
              'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*2.5',
            manaCost: 1,
            skillConfig: null,
            createdAt: '2022-01-18T10:55:02.921Z',
            updatedAt: '2022-01-18T10:55:02.921Z',
            isLearned: false,
          },
          {
            id: 8,
            skillId: 2,
            lvl: 3,
            description:
              'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*3',
            manaCost: 1,
            skillConfig: null,
            createdAt: '2022-01-18T10:55:19.025Z',
            updatedAt: '2022-01-18T10:55:19.025Z',
            isLearned: false,
          },
          {
            id: 9,
            skillId: 2,
            lvl: 4,
            description:
              'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*3.5',
            manaCost: 1,
            skillConfig: null,
            createdAt: '2022-01-18T10:55:31.928Z',
            updatedAt: '2022-01-18T10:55:31.928Z',
            isLearned: false,
          },
          {
            id: 10,
            skillId: 2,
            lvl: 5,
            description:
              'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*4',
            manaCost: 1,
            skillConfig: null,
            createdAt: '2022-01-18T10:55:41.862Z',
            updatedAt: '2022-01-18T10:55:41.862Z',
            isLearned: false,
          },
        ],
        learned: 2,
        children: [
          {
            id: 4,
            skillId: 'shield_slam',
            name: 'Shield Slam 3',
            requiredLevel: 0,
            type: 'Active',
            damageType: 'Physical',
            canBeCountered: false,
            job: 'Paladin',
            parentId: 1,
            race: 'Human',
            createdAt: '2022-01-18T10:54:13.296Z',
            updatedAt: '2022-01-18T10:54:13.296Z',
            levels: [
              {
                id: 6,
                skillId: 4,
                lvl: 1,
                description:
                  'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*2',
                manaCost: 1,
                skillConfig: null,
                createdAt: '2022-01-18T10:54:42.063Z',
                updatedAt: '2022-01-18T10:54:42.063Z',
                isLearned: false,
              },
              {
                id: 7,
                skillId: 4,
                lvl: 2,
                description:
                  'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*2.5',
                manaCost: 1,
                skillConfig: null,
                createdAt: '2022-01-18T10:55:02.921Z',
                updatedAt: '2022-01-18T10:55:02.921Z',
                isLearned: false,
              },
              {
                id: 8,
                skillId: 4,
                lvl: 3,
                description:
                  'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*3',
                manaCost: 1,
                skillConfig: null,
                createdAt: '2022-01-18T10:55:19.025Z',
                updatedAt: '2022-01-18T10:55:19.025Z',
                isLearned: false,
              },
              {
                id: 9,
                skillId: 4,
                lvl: 4,
                description:
                  'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*3.5',
                manaCost: 1,
                skillConfig: null,
                createdAt: '2022-01-18T10:55:31.928Z',
                updatedAt: '2022-01-18T10:55:31.928Z',
                isLearned: false,
              },
              {
                id: 10,
                skillId: 4,
                lvl: 5,
                description:
                  'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*4',
                manaCost: 1,
                skillConfig: null,
                createdAt: '2022-01-18T10:55:41.862Z',
                updatedAt: '2022-01-18T10:55:41.862Z',
                isLearned: false,
              },
            ],
            learned: 0,
            children: [
              {
                id: 8,
                skillId: 'shield_slam',
                name: 'Shield Slam 3',
                requiredLevel: 0,
                type: 'Active',
                damageType: 'Physical',
                canBeCountered: false,
                job: 'Paladin',
                parentId: 1,
                race: 'Human',
                createdAt: '2022-01-18T10:54:13.296Z',
                updatedAt: '2022-01-18T10:54:13.296Z',
                levels: [
                  {
                    id: 6,
                    skillId: 4,
                    lvl: 1,
                    description:
                      'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*2',
                    manaCost: 1,
                    skillConfig: null,
                    createdAt: '2022-01-18T10:54:42.063Z',
                    updatedAt: '2022-01-18T10:54:42.063Z',
                    isLearned: false,
                  },
                  {
                    id: 7,
                    skillId: 4,
                    lvl: 2,
                    description:
                      'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*2.5',
                    manaCost: 1,
                    skillConfig: null,
                    createdAt: '2022-01-18T10:55:02.921Z',
                    updatedAt: '2022-01-18T10:55:02.921Z',
                    isLearned: false,
                  },
                  {
                    id: 8,
                    skillId: 4,
                    lvl: 3,
                    description:
                      'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*3',
                    manaCost: 1,
                    skillConfig: null,
                    createdAt: '2022-01-18T10:55:19.025Z',
                    updatedAt: '2022-01-18T10:55:19.025Z',
                    isLearned: false,
                  },
                  {
                    id: 9,
                    skillId: 4,
                    lvl: 4,
                    description:
                      'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*3.5',
                    manaCost: 1,
                    skillConfig: null,
                    createdAt: '2022-01-18T10:55:31.928Z',
                    updatedAt: '2022-01-18T10:55:31.928Z',
                    isLearned: false,
                  },
                  {
                    id: 10,
                    skillId: 4,
                    lvl: 5,
                    description:
                      'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*4',
                    manaCost: 1,
                    skillConfig: null,
                    createdAt: '2022-01-18T10:55:41.862Z',
                    updatedAt: '2022-01-18T10:55:41.862Z',
                    isLearned: false,
                  },
                ],
                learned: 0,
              },
            ],
          },
          {
            id: 7,
            skillId: 'shield_slam',
            name: 'Shield Slam',
            requiredLevel: 0,
            type: 'Active',
            damageType: 'Physical',
            canBeCountered: false,
            job: 'Paladin',
            parentId: 1,
            race: 'Human',
            createdAt: '2022-01-18T10:54:13.296Z',
            updatedAt: '2022-01-18T10:54:13.296Z',
            levels: [
              {
                id: 6,
                skillId: 2,
                lvl: 1,
                description:
                  'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*2',
                manaCost: 1,
                skillConfig: null,
                createdAt: '2022-01-18T10:54:42.063Z',
                updatedAt: '2022-01-18T10:54:42.063Z',
                isLearned: false,
              },
              {
                id: 7,
                skillId: 2,
                lvl: 2,
                description:
                  'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*2.5',
                manaCost: 1,
                skillConfig: null,
                createdAt: '2022-01-18T10:55:02.921Z',
                updatedAt: '2022-01-18T10:55:02.921Z',
                isLearned: false,
              },
              {
                id: 8,
                skillId: 2,
                lvl: 3,
                description:
                  'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*3',
                manaCost: 1,
                skillConfig: null,
                createdAt: '2022-01-18T10:55:19.025Z',
                updatedAt: '2022-01-18T10:55:19.025Z',
                isLearned: false,
              },
              {
                id: 9,
                skillId: 2,
                lvl: 4,
                description:
                  'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*3.5',
                manaCost: 1,
                skillConfig: null,
                createdAt: '2022-01-18T10:55:31.928Z',
                updatedAt: '2022-01-18T10:55:31.928Z',
                isLearned: false,
              },
              {
                id: 10,
                skillId: 2,
                lvl: 5,
                description:
                  'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*4',
                manaCost: 1,
                skillConfig: null,
                createdAt: '2022-01-18T10:55:41.862Z',
                updatedAt: '2022-01-18T10:55:41.862Z',
                isLearned: false,
              },
            ],
            learned: 0,
            children: [],
          },
        ],
      },
      {
        id: 3,
        skillId: 'shield_slam',
        name: 'Shield Slam 2',
        requiredLevel: 0,
        type: 'Active',
        damageType: 'Physical',
        canBeCountered: false,
        job: 'Paladin',
        parentId: 1,
        race: 'Human',
        createdAt: '2022-01-18T10:54:13.296Z',
        updatedAt: '2022-01-18T10:54:13.296Z',
        levels: [
          {
            id: 6,
            skillId: 3,
            lvl: 1,
            description:
              'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*2',
            manaCost: 1,
            skillConfig: null,
            createdAt: '2022-01-18T10:54:42.063Z',
            updatedAt: '2022-01-18T10:54:42.063Z',
            isLearned: false,
          },
          {
            id: 7,
            skillId: 3,
            lvl: 2,
            description:
              'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*2.5',
            manaCost: 1,
            skillConfig: null,
            createdAt: '2022-01-18T10:55:02.921Z',
            updatedAt: '2022-01-18T10:55:02.921Z',
            isLearned: false,
          },
          {
            id: 8,
            skillId: 3,
            lvl: 3,
            description:
              'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*3',
            manaCost: 1,
            skillConfig: null,
            createdAt: '2022-01-18T10:55:19.025Z',
            updatedAt: '2022-01-18T10:55:19.025Z',
            isLearned: false,
          },
          {
            id: 9,
            skillId: 3,
            lvl: 4,
            description:
              'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*3.5',
            manaCost: 1,
            skillConfig: null,
            createdAt: '2022-01-18T10:55:31.928Z',
            updatedAt: '2022-01-18T10:55:31.928Z',
            isLearned: false,
          },
          {
            id: 10,
            skillId: 3,
            lvl: 5,
            description:
              'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*4',
            manaCost: 1,
            skillConfig: null,
            createdAt: '2022-01-18T10:55:41.862Z',
            updatedAt: '2022-01-18T10:55:41.862Z',
            isLearned: false,
          },
        ],
        learned: 0,
        children: [
          {
            id: 5,
            skillId: 'shield_slam',
            name: 'Shield Slam 2',
            requiredLevel: 0,
            type: 'Active',
            damageType: 'Physical',
            canBeCountered: false,
            job: 'Paladin',
            parentId: 1,
            race: 'Human',
            createdAt: '2022-01-18T10:54:13.296Z',
            updatedAt: '2022-01-18T10:54:13.296Z',
            levels: [
              {
                id: 6,
                skillId: 3,
                lvl: 1,
                description:
                  'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*2',
                manaCost: 1,
                skillConfig: null,
                createdAt: '2022-01-18T10:54:42.063Z',
                updatedAt: '2022-01-18T10:54:42.063Z',
                isLearned: false,
              },
              {
                id: 7,
                skillId: 3,
                lvl: 2,
                description:
                  'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*2.5',
                manaCost: 1,
                skillConfig: null,
                createdAt: '2022-01-18T10:55:02.921Z',
                updatedAt: '2022-01-18T10:55:02.921Z',
                isLearned: false,
              },
              {
                id: 8,
                skillId: 3,
                lvl: 3,
                description:
                  'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*3',
                manaCost: 1,
                skillConfig: null,
                createdAt: '2022-01-18T10:55:19.025Z',
                updatedAt: '2022-01-18T10:55:19.025Z',
                isLearned: false,
              },
              {
                id: 9,
                skillId: 3,
                lvl: 4,
                description:
                  'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*3.5',
                manaCost: 1,
                skillConfig: null,
                createdAt: '2022-01-18T10:55:31.928Z',
                updatedAt: '2022-01-18T10:55:31.928Z',
                isLearned: false,
              },
              {
                id: 10,
                skillId: 3,
                lvl: 5,
                description:
                  'Stun enemy 1 turn, gây pure damage = (shield magic def + physic def)*4',
                manaCost: 1,
                skillConfig: null,
                createdAt: '2022-01-18T10:55:41.862Z',
                updatedAt: '2022-01-18T10:55:41.862Z',
                isLearned: false,
              },
            ],
            learned: 0,
            children: [],
          },
        ],
      },
    ],
  },
];
