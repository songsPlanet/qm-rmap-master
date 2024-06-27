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
        id: 'theme-map-table',
        path: '/theme-map-table',
      },
      {
        id: 'theme-map-edit',
        path: '/theme-map-edit',
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

// 获取行政区域
Mock.mock('/v1.0/chinaProvince/region', 'post', {
  code: 0,
  message: '操作成功',
  data: [
    {
      value: '34',
      label: '安徽省',
      fullName: '安徽省',
      children: [
        {
          value: '3412',
          label: '阜阳市',
          fullName: '安徽省阜阳市',
          children: [
            {
              value: '341282',
              label: '界首市',
              fullName: '安徽省阜阳市界首市',
              children: [
                {
                  value: '341282108',
                  label: '砖集镇',
                  fullName: '安徽省阜阳市界首市砖集镇',
                  children: [
                    {
                      value: '341282108204',
                      label: '姜洼村',
                      fullName: '安徽省阜阳市界首市砖集镇姜洼村',
                      children: [],
                      provincecode: '',
                      citycode: '',
                      areacode: '',
                      streetcode: '',
                      villagecode: '',
                    },
                    {
                      value: '341282108205',
                      label: '郑庄村',
                      fullName: '安徽省阜阳市界首市砖集镇郑庄村',
                      children: [],
                      provincecode: '',
                      citycode: '',
                      areacode: '',
                      streetcode: '',
                      villagecode: '',
                    },
                  ],
                  provincecode: '',
                  citycode: '',
                  areacode: '',
                  streetcode: '',
                  villagecode: '',
                },
                {
                  value: '341282105',
                  label: '田营镇',
                  fullName: '安徽省阜阳市界首市田营镇',
                  children: [
                    {
                      value: '341282105202',
                      label: '吴桥村',
                      fullName: '安徽省阜阳市界首市田营镇吴桥村',
                      children: [],
                      provincecode: '',
                      citycode: '',
                      areacode: '',
                      streetcode: '',
                      villagecode: '',
                    },
                  ],
                  provincecode: '',
                  citycode: '',
                  areacode: '',
                  streetcode: '',
                  villagecode: '',
                },
              ],
              provincecode: '',
              citycode: '',
              areacode: '',
              streetcode: '',
              villagecode: '',
            },
          ],
          provincecode: '',
          citycode: '',
          areacode: '',
          streetcode: '',
          villagecode: '',
        },
      ],
      provincecode: '',
      citycode: '',
      areacode: '',
      streetcode: '',
      villagecode: '',
    },
  ],
});
