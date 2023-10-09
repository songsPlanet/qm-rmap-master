import Mock from 'mockjs';

// 登录
Mock.mock('/v1.0/login/admin', 'post', {
  code: 0,
  message: '操作成功',
  data: {
    id: '6396cddf1a4afe167885797f',
    username: 'jasmine',
    password: '',
    regionCode: '4100',
    regionName: '湖南省',
    organizationId: 0,
    realName: 'jasmine',
    phone: '',
    avatar: '',
    clientId: 'end',
    status: 1,
    superAdmin: false,
    createdTime: null,
    updateTime: '2022-12-12 14:44:46',
    token: '990ce234-8ba2-4da5-931e-cce302962be9',
    loginType: 'end',
    roleIdList: ['1', '2', '3', '4'],
    resourceList: [
      {
        id: 'user',
        path: '/user',
        children: [
          {
            id: 'user-1',
            path: '/user/user-list',
          },
          {
            id: 'user-2',
            path: '/user/role-list',
          },
        ],
      },
      {
        id: 'home',
        path: '/home',
      },
      {
        id: 'theme-map',
        path: '/theme-map',
      },
      {
        id: 'theme-map-njzy',
        path: '/theme-map-njzy',
      },
    ],
  },
});

Mock.mock('/v1.0/logout', 'post', {
  code: 0,
  message: '操作成功',
  data: null,
});

Mock.mock('/v1.0/sysUser/changePassword', 'post', {
  code: 0,
  message: '操作成功',
  data: null,
});

Mock.mock('/v1.0/menuSource', 'post', {
  code: 0,
  message: '操作成功',
  data: [
    {
      path: '/user',
      children: [
        {
          path: '/user/user-list',
        },
        {
          path: '/user/role-list',
        },
      ],
    },
  ],
});

Mock.mock('/v1.0/sysDict/list', 'post', {
  code: 0,
  message: '操作成功',
  data: [
    {
      dictName: '作物分布-2023小麦',
      value: 'zwfb_341282_2023_summer',
    },
    {
      dictName: '种植结构变化-2022玉米',
      value: 'zzjgbh_341282_2022_autumn',
    },
  ],
});

Mock.mock('/v1.0/xxnyjyzt/getXxjyztList', 'post', {
  code: 0,
  message: '操作成功',
  data: [
    {
      fzr: '陈亚亚',
      id: 5,

      zjhm: '1232131213',
    },
  ],
});

Mock.mock('/v1.0/xxnyjyzt/getXxjyztListDetail', 'post', {
  code: 0,
  message: '操作成功',
  data: {
    dkArea: 133.734492622,
    dkNum: 108,
    fzr: '陈亚亚',
    id: 5,
    tgmj: 0,
    zjhm: '1232131213',
    dkSpatials: {
      features: [
        {
          geometry: {
            coordinates: [
              [
                [
                  [115.335268745, 33.117418782],
                  [115.335267227, 33.117381923],
                  [115.333729183, 33.117272451],
                  [115.333724974, 33.117310634],
                  [115.335268745, 33.117418782],
                ],
              ],
            ],
            type: 'MultiPolygon',
          },
          id: '85349',
          type: 'Feature',
          properties: {
            dkbm: '3412821072110700067',
            dkmc: '庄北地',
            dkmj: 0.9,
            lzxglx: '',
            mj: 0,
            ygcl: '',
            zwzs: '',
            zzjgName: '',
            zzzw: '小麦',
          },
        },
        {
          geometry: {
            coordinates: [
              [
                [
                  [115.333844325, 33.11534022],
                  [115.331415152, 33.114950197],
                  [115.331405673, 33.114978991],
                  [115.333835306, 33.11536837],
                  [115.333844325, 33.11534022],
                ],
              ],
            ],
            type: 'MultiPolygon',
          },
          id: '85990',
          properties: {
            dkmc: '西地',
            dkbm: '3412821072110600144',
            dkmj: 1.13,
            zzzw: '小麦',
            mj: 0,
            zwzs: '',
            ygcl: '',
          },
          type: 'Feature',
        },
      ],
    },
  },
});

Mock.mock('/v1.0/table/getYear', 'post', {
  code: 0,
  message: '操作成功',
  data: ['2023'],
});

Mock.mock('/v1.0/table/getRegions', 'post', {
  code: 0,
  message: '操作成功',
  data: [
    {
      value: '43',
      label: '湖南市',
      children: [
        {
          value: '4303',
          label: '湘潭市',
          children: [{ value: '430381', label: '湘乡市', children: [{ value: '430381102', label: '中沙镇' }] }],
        },
      ],
    },
  ],
});

Mock.mock('/v1.0/table/getCropTypeList', 'post', {
  code: 0,
  message: '操作成功',
  data: [{ value: '早稻', label: 'zaodao' }],
});

Mock.mock('/v1.0/table/getRegionPageList', 'post', {
  code: 0,
  message: '操作成功',
  data: {
    pageNum: 1,
    pageSize: 10,
    pages: 1,
    prePage: 0,
    size: 1,
    startRow: 1,
    total: 1,
    list: [{ xzqhmc: '西冲村', insuredCronName: '早稻', coverageRate: 0.5747 }],
  },
});
