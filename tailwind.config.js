module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  prefix: 'g-',
  theme: {
    extend: {
      colors: {
        theme: {
          // light: '',
          default: '#DA0000',
          // dark: '',
        },
        gray: {
          100: '#f5f7f9', // 背景
          200: '#f2f6fc', // 四级边框
          300: '#ebeef5', // 三级边框
          400: '#e4e7ed', // 二级边框
          500: '#dcdfe6', // 一级边框
          600: '#c0c4cc', // 占位文字
          700: '#909399', // 次要文字
          800: '#606266', // 常规文字
          900: '#303133', // 主要文字
        },
        green: {
          default: '#00cc69',
        },
        yellow: {
          default: '#ff9900',
        },
        red: {
          default: '#ff5300',
        },
      },
      spacing: {
        0: '0px',
        'px': '1px',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
        12: '48px',
        16: '64px',
        20: '80px',
        24: '96px',
        32: '128px',
        40: '160px',
        48: '192px',
        56: '224px',
        64: '256px',
      },
      fontSize: {
        'xs': '10px',
        'sm': '12px',
        'base': '14px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '38px',
      },
      lineHeight: {
        'none': '1',
        'sm': '20px',
        'base': '22px',
        'lg': '24px',
        'xl': '28px',
        '2xl': '32px',
        '3xl': '38px',
        '4xl': '46px',
      },
    },
  },
  variants: {},
  plugins: [],
}
