import { describe, it, expect } from 'vitest';
import { useI18n } from 'vue-i18n';
import useDate from './useDate.js';
import TestUtils from '../utils/TestUtils.js';

import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

describe('DateUtils', () => {

    // playground
    it('utcToZonedTime', () => {
        // const date = utcToZonedTime('2021-01-01T00:00:00', 'America/Los_Angeles')
        const date = utcToZonedTime('2021-01-01T00:00:00', 'UTC');

        console.log("utcToZonedTime3", date);
        console.log(date.getHours())

        const browserDate = new Date('2021-01-01T00:00:00');
        const utc = Date.UTC(
            browserDate.getFullYear(),
            browserDate.getMonth(),
            browserDate.getDate(),
            browserDate.getHours(),
            browserDate.getMinutes(),
            browserDate.getSeconds(),
        );
        console.log("utc", utc);
    });
    // it('zonedTimeToUtc', () => {
    //     const { dateTo8601, dateObjectToUtcDateObject } = TestUtils.mockLoadComposableInApp( () => useDate() );

    //     const date = new Date();
    //     date.setFullYear(2021);
    //     date.setMonth(0);
    //     date.setDate(1);
    //     date.setHours(8);
    //     date.setMinutes(0);
    //     date.setSeconds(0);
    //     date.setMilliseconds(0);

    //     const zonedDate = zonedTimeToUtc(date, 'America/Los_Angeles')
    //     console.log("zonedTimeToUtc", zonedDate);
    //     console.log("zonedTimeToUtc toISOString", zonedDate.toISOString().replace('Z', ''));
    //     console.log("zonedTimeToUtc dateTo8601", dateTo8601(zonedDate));
    //     // console.log("dateObjectToUtcDateObject", dateObjectToUtcDateObject(date).toISOString());
    // });


    describe('convertIsoDateToTimezone()', () => {
        const {
            convertIsoDateToTimezone,
            isDaylightSavingTime
        } = TestUtils.mockLoadComposableInApp( () => useDate() );

        it('should convert an ISO-6601 date to another timezone', () => {
            expect(
                convertIsoDateToTimezone('2021-01-01T08:00:00', 'America/Los_Angeles') // −07:00 or −08:00
            ).toBe(isDaylightSavingTime ? '2021-01-01T01:00:00' : '2021-01-01T00:00:00');

            expect(
                convertIsoDateToTimezone('2021-01-01T08:00:00', 'America/Denver') // −07:00 or −06:00
            ).toBe(isDaylightSavingTime ? '2021-01-01T02:00:00' : '2021-01-01T01:00:00');

            expect(
                convertIsoDateToTimezone('2021-01-01T08:00:00', 'America/Indiana/Knox') // −06:00 or −05:00
            ).toBe(isDaylightSavingTime ? '2021-01-01T03:00:00' : '2021-01-01T02:00:00');

            expect(
                convertIsoDateToTimezone('2021-01-01T08:00:00', 'America/New_York') // −05:00 or −04:00
            ).toBe(isDaylightSavingTime ? '2021-01-01T04:00:00' : '2021-01-01T03:00:00');
        });
    });


    describe('addLeadingZero()', () => {
        const { addLeadingZero } = TestUtils.mockLoadComposableInApp( () => useDate() );

        it('should add a leading zero to a number less than 10', () => {
            expect( addLeadingZero(1) ).toBe('01');
        });

        it('should not add a leading zero to a number greater than 9', () => {
            expect( addLeadingZero(10) ).toBe(10);
        });
    });


    describe('dateTo8601()', () => {
        const { dateTo8601 } = TestUtils.mockLoadComposableInApp( () => useDate() );

        it('should return the same date in ISO-8601 format', () => {
            /*
            Note: setting the zero UTC offset, as specified by '.000Z' in the date string
            will result in the Date object being LOCAL time (UTC-8 in my case).

            const date = new Date('2021-01-01T00:00:00.000Z');
            date.getHours(); // 16 (8 hours behind the date above) in PST

            Conversely, not using Z will result in:
            const date = new Date('2021-01-01T00:00:00');
            date.getHours();  // 0
            */
            // const date = new Date('2021-01-01T00:00:00'); // this works too
            const date = new Date();
            date.setFullYear(2021);
            date.setMonth(0);
            date.setDate(1);
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);

            // console.log("dateTo8601 toISOString", date.toISOString());
            // console.log("dateTo8601 getHours", date.getHours());
            // console.log("dateTo8601 fn", dateTo8601(date));

            expect( dateTo8601(date) ).toBe('2021-01-01T00:00:00');
        });

        it('should return the UTC date in ISO-8601 format when given a date with a timezone offset', () => {
            const date = new Date('2021-01-01T00:00:00.000Z');
            expect( dateTo8601(date) ).toBe('2020-12-31T16:00:00'); // 4pm PST (UTC-8)
        });
    });


    describe('dateObjectToZonedDateObject()', () => {
        const { dateObjectToZonedDateObject } = TestUtils.mockLoadComposableInApp( () => useDate() );

        it('should return a date object in the given timezone', () => {
            // const date = new Date('2021-01-01T00:00:00');
            const date = new Date();
            date.setFullYear(2021);
            date.setMonth(0);
            date.setDate(1);
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);

            /*
            Logging this Date object will show the UTC representation of the date (with .000Z)
            which is 8 hours ahead of the PST date above:

            console.log("input date1", date); // 2021-01-01T08:00:00.000Z
            */

            const timezone = 'America/Los_Angeles';
            const zonedDate = dateObjectToZonedDateObject(date, timezone);

            /*
            Now logging this Date object will show the adjusted representation of the date (with .000Z)

            console.log("zoned date1", zonedDate); // 2021-01-01T00:00:00.000Z

            and therefore zonedDate.getHours() will be 16 (8 hours behind the date above) in PST
            */

            expect( zonedDate.getFullYear() ).toBe(2020);
            expect( zonedDate.getMonth() ).toBe(11);
            expect( zonedDate.getDate() ).toBe(31);
            expect( zonedDate.getHours() ).toBe(16);
            expect( zonedDate.getMinutes() ).toBe(0);
            expect( zonedDate.getSeconds() ).toBe(0);
        });
    });


    describe('dateObjectToUtcDateObject()', () => {
        const { dateObjectToUtcDateObject } = TestUtils.mockLoadComposableInApp( () => useDate() );

        it('should return a date object in UTC', () => {
            const date = new Date();
            date.setFullYear(2023);
            date.setMonth(1);
            date.setDate(1);
            date.setHours(16); // 4pm PST
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);

            const utcDate = dateObjectToUtcDateObject(date);

            // UTC is 8 hours ahead of PST
            expect( utcDate.getFullYear() ).toBe(2023);
            expect( utcDate.getMonth() ).toBe(1);
            expect( utcDate.getDate() ).toBe(2);
            expect( utcDate.getHours() ).toBe(0);
            expect( utcDate.getMinutes() ).toBe(0);
            expect( utcDate.getSeconds() ).toBe(0);
        });
    });


    describe('format8601()', () => {
        // const { format8601 } = TestUtils.mockLoadComposableInApp( () => useDate() );
        const composables = TestUtils.mockLoadComposableInApp(() => {
            return [
                useDate(),
                useI18n()
            ]
        });

        const format8601 = composables[0].format8601;
        const { t } = composables[1];

        it('should return the formatted ISO-8601 date', () => {
            const date = new Date();
            date.setFullYear(2023);
            date.setMonth(1);
            date.setDate(1);
            date.setHours(16); // 4pm PST
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);

            expect( format8601(date, null, 'America/Los_Angeles') ).toBe('01/Feb/23 4:00 PM'); // −08:00
            expect( format8601(date, null, 'America/Denver') ).toBe('01/Feb/23 5:00 PM'); // −07:00
            expect( format8601(date, null, 'America/Indiana/Knox') ).toBe('01/Feb/23 6:00 PM'); // −06:00
            expect( format8601(date, null, 'America/New_York') ).toBe('01/Feb/23 7:00 PM'); // −05:00

            expect( format8601(date, t('date.format.mdy'), 'America/Los_Angeles') ).toBe('01/Feb/23');
            expect( format8601(date, t('date.format.mdy'), 'America/Denver') ).toBe('01/Feb/23');
            expect( format8601(date, t('date.format.mdy'), 'America/Indiana/Knox') ).toBe('01/Feb/23');
            expect( format8601(date, t('date.format.mdy'), 'America/New_York') ).toBe('01/Feb/23');

            expect( format8601(date, t('date.format.hm'), 'America/Los_Angeles') ).toBe('4:00 PM');
            expect( format8601(date, t('date.format.hm'), 'America/Denver') ).toBe('5:00 PM');
            expect( format8601(date, t('date.format.hm'), 'America/Indiana/Knox') ).toBe('6:00 PM');
            expect( format8601(date, t('date.format.hm'), 'America/New_York') ).toBe('7:00 PM');
        });
    });


    describe('updateSecondsOfIso8601()', () => {
        const { updateSecondsOfIso8601 } = TestUtils.mockLoadComposableInApp( () => useDate() );

        it('should update the seconds of an ISO-8601 string', () => {
            expect( updateSecondsOfIso8601('2021-01-01T00:00:00.000Z', 30) ).toBe('2021-01-01T00:00:30.000Z');
            expect( updateSecondsOfIso8601('2021-01-01T00:00:00Z', 30) ).toBe('2021-01-01T00:00:30Z');
            expect( updateSecondsOfIso8601('2021-01-01T00:00:00', 30) ).toBe('2021-01-01T00:00:30');
        });
    });

});
