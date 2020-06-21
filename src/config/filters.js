import {DateTime} from 'luxon'

export default (Vue) => {

  Vue.filter('dateFormat', value => {
    if (value) {
      if (!value) {
        return "-";
      }

      return DateTime.fromISO(new Date(value).toISOString()).toFormat("yyyy-MM-dd HH':'mm':'ss");
    }
  })

}

