import { CSSProperties } from 'react'
//import { StyleSheet } from '@react-18-pdf/renderer'

interface CSSClasses {
  [key: string]: CSSProperties
}

const colorDark = '#222'
const colorDark2 = '#666'
const colorGray = '#e3e3e3'
const colorWhite = '#fff'

const styles: CSSClasses = {
  dark: {
    color: colorDark,
  },

  white: {
    color: colorWhite,
  },

  'bg-dark': {
    backgroundColor: colorDark2,
  },

  'bg-gray': {
    backgroundColor: colorGray,
  },

  flex: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },

  'w-auto': {
    flex: 1,
    paddingRight: '8px',
  },
  'w-auto-left': {
    flex: 1,
    paddingLeft: '8px',
  },

  'ml-30': {
    flex: 1,
  },

  'w-100': {
    width: '100%',
  },

  'w-50': {
    width: '50%',
  },

  'w-55': {
    width: '55%',
  },

  'w-45': {
    width: '45%',
  },

  'w-60': {
    width: '60%',
  },
  
  'w-70': {
    width: '70%',
  },

  'w-30': {
    width: '30%',
  },

  'w-40': {
    width: '40%',
  },

  'w-48': {
    width: '48%',
  },

  'w-17': {
    width: '17%',
  },

  'w-18': {
    width: '18%',
  },

  row: {
    borderBottom: `1px solid ${colorGray}`,
  },

  'mt-40': {
    marginTop: '40px',
  },

  'mt-30': {
    marginTop: '30px',
  },

  'mt-20': {
    marginTop: '20px',
  },

  'mt-10': {
    marginTop: '10px',
  },

  'mb-5': {
    marginBottom: '5px',
  },

  'p-4-8': {
    padding: '4px 8px',
  },
  'p-8-4': {
    padding: '8px 4px',
  },

  'p-5': {
    padding: '5px',
  },

  'pb-10': {
    paddingBottom: '10px',
  },

  left: {
    textAlign: 'left',
  },

  right: {
    textAlign: 'right',
  },

  center: {
    textAlign: 'center',
  },


  bold: {
    fontWeight: 'bold',
  },

  'fs-11': {
    fontSize: '11px',
  },

  'fs-14': {
    fontSize: '14px',
  },

  'fs-20': {
    fontSize: '20px',
  },

  'fs-30': {
    fontSize: '30px',
  },

  'fs-45': {
    fontSize: '45px',
  },

  page: {
    fontFamily: 'Nunito',
    fontSize: '13px',
    color: '#555',
    padding: '40px 35px',
    border: '1px solid #e3e3e3',
  },

  span: {
    padding: '4px 12px 4px 0',
  },

  'span-left': {
    padding: '0px 0px 0px 24px',
  },

  logo: {
    display: 'block',
  }
}

export default styles
