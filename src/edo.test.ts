import {EDOSystem} from './Classes/EDOSystem';

// Test <tonelist> parameter for 12-tone EDO
test('12-tone tonelist', () => {
    let edo = new EDOSystem(12);
    let _12tonelist = edo.getToneList();
    expect(_12tonelist.E).toBe(4);
});

// Test frequency conversion for 12-tone EDO
test('A4 = 440Hz (standard tuning)', () => {
    let edo = new EDOSystem(12);
    let _12tonelist = edo.getToneList();
    let a4 = edo.frequencyToNote(440);
    expect(a4.note).toBe(_12tonelist.A);
    expect(a4.octave).toBe(4);
});

test('F6 = 1397Hz (calculated note)', () => {
    let edo = new EDOSystem(12);
    let _12tonelist = edo.getToneList();
    let f6 = edo.frequencyToNote(1397);
    expect(f6.note).toBe(_12tonelist.F);
    expect(f6.octave).toBe(6);
});

test('F6 ~ 1420Hz (note approximation)', () => {
    let edo = new EDOSystem(12);
    let _12tonelist = edo.getToneList();
    let f6 = edo.frequencyToNote(1420);
    expect(f6.note).toBe(_12tonelist.F);
    expect(f6.octave).toBe(6);
});