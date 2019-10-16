import { Injectable } from '@angular/core';
import {Elastic, Expo, Bounce, TimelineMax} from 'gsap/TweenMax';

@Injectable({
  providedIn: 'root'
})
export class DrumkitService {

  public activateDrum(note: number): void {
    if (note === 57) {this.crash(); }
    if (note === 50) {this.leftTomDrum(); }
    if (note === 51) {this.rightTomDrum(); }
    if (note === 42) {this.floorTomDrum(); }
    if (note === 38) {this.hiHat(); }
    if (note === 41) {this.snareDrum(); }
  }

  private crash() {
    // crash variable
    const crashCymbol = document.getElementById('Crash-Cymbol');
    const crashAudio = document.getElementById('Crash-Audio');
    // crash wobble
    const crashtl = new TimelineMax({
      paused: true
    });
    crashtl.to(crashCymbol, 0.1, {rotation: 8, transformOrigin: '50% 50%'})
      .to(crashCymbol, 1.5, {rotation: 0, transformOrigin: '50% 50%', ease: Elastic.easeOut.config(2.5, 0.3)});
    // crash stuff
    crashtl.restart();
    crashtl.play();
    // crash audio
    // @ts-ignore
    crashAudio.currentTime = 0;
    // @ts-ignore
    crashAudio.play();
  }

  private floorTomDrum() {
    // floor tom drum varibles
    const floorTomDrumAll = document.getElementById('Floor-Tom');
    const floorTomAudio = document.getElementById('Floor-Tom-Audio');

    // floor tom drum wobble
    const floorTomtl = new TimelineMax({
      paused: true
    });
    floorTomtl.to(floorTomDrumAll, 0.1, {scaleX: 1.02, transformOrigin: '50% 50%', ease: Expo.easeOut})
      .to(floorTomDrumAll, 0.1, {scaleY: 0.95, transformOrigin: '50% 100%', ease: Expo.easeOut}, '0')
      .to(floorTomDrumAll, 0.4, {scale: 1, transformOrigin: '50% 100%', ease: Elastic.easeOut});

    // floor tom tl stuff
    floorTomtl.restart();
    floorTomtl.play();
    // floor tom audio
    // @ts-ignore
    floorTomAudio.currentTime = 0;
    // @ts-ignore
    floorTomAudio.play();
  }

  private hiHat() {
    // hi-hat varibles
    const hiHatTop = document.getElementById('Hi-Hat-Top');
    const hiHatBottom = document.getElementById('Hi-Hat-Bottom');
    const hiHatStandTop = document.getElementById('Hi-Hat-Stand-Top');
    const hiHatOpenAudio = document.getElementById('Hi-Hat-Open-Audio');
    const hiHatClosedAudio = document.getElementById('Hi-Hat-Closed-Audio');

    // hi-hat stand up/down
    const hiHatUptl = new TimelineMax({
      paused: true
    });
    hiHatUptl.to(hiHatStandTop, 0.3, {y: '-5%', ease: Bounce.easeOut});

    // hi-hat wobble
    const hiHattl = new TimelineMax({
      paused: true
    });
    hiHattl.to([hiHatTop, hiHatBottom], 0.1, {rotation: -4, transformOrigin: '50% 50%'})
      .to([hiHatTop, hiHatBottom], 0.6, {
        rotation: 0,
        transformOrigin: '50% 50%',
        ease: Elastic.easeOut.config(1.5, 0.2)
      });

    // hi-hat counter and tl stuff
    let hiHati = 0;

    ++hiHati;
    hiHattl.restart();
    hiHattl.play();
    if (hiHati < 8) {
      hiHatUptl.reverse();
      // high hat audio
      // @ts-ignore
      hiHatClosedAudio.currentTime = 0;
      // @ts-ignore
      hiHatClosedAudio.play();
    } else {
      hiHatUptl.play();
      // high hat audio
      // @ts-ignore
      hiHatOpenAudio.currentTime = 0;
      // @ts-ignore
      hiHatOpenAudio.play();
      hiHati = 0;
    }
  }

  public activateKickDrum() {
    // kick drum varibles
    const kickDrumAll = document.getElementById('Kick');
    const kickAudio = document.getElementById('Kick-Audio');
    // kick drum wobble
    const kicktl = new TimelineMax({
      paused: true
    });
    kicktl.to(kickDrumAll, 0.1, {scale: 1.02, transformOrigin: '50% 100%', ease: Expo.easeOut})
      .to(kickDrumAll, 0.4, {scale: 1, transformOrigin: '50% 100%', ease: Elastic.easeOut});

    // kick tl stuff
    kicktl.restart();
    kicktl.play();
    // kick audio
    // @ts-ignore
    kickAudio.currentTime = 0;
    // @ts-ignore
    // kickAudio.play();
  }

  private leftTomDrum() {

    // left tom drum varibles
    const leftTomDrumAll = document.getElementById('Tom-Left-All');
    // tslint:disable-next-line:no-shadowed-variable
    const leftTomDrum = document.getElementById('Tom-Left-Drum');
    const bigTomAudio = document.getElementById('Big-Rack-Tom-Audio');

    // left tom drum wobble
    const leftTomtl = new TimelineMax({
      paused: true
    });
    leftTomtl.to(leftTomDrum, 0.1, {scaleX: 1.04, transformOrigin: '50% 50%', ease: Expo.easeOut})
      .to(leftTomDrum, 0.1, {scaleY: 0.95, transformOrigin: '50% 50%', ease: Expo.easeOut}, '0')
      .to(leftTomDrumAll, 0.1, {rotation: -2.5, transformOrigin: '100% 50%', ease: Elastic.easeOut}, '0')
      .to(leftTomDrum, 0.4, {scale: 1, transformOrigin: '50% 50%', ease: Elastic.easeOut})
      .to(leftTomDrumAll, 0.6, {rotation: 0, transformOrigin: '100% 50%', ease: Elastic.easeOut}, '-=0.4');

    // left tom tl stuff
    leftTomtl.restart();
    leftTomtl.play();
    // left tom audio
    // @ts-ignore
    bigTomAudio.currentTime = 0;
    // @ts-ignore
    bigTomAudio.play();
  }

  private rightTomDrum() {
    // right tom drum variables
    const rightTomDrumAll = document.getElementById('Tom-Right-All');
    // tslint:disable-next-line:no-shadowed-variable
    const rightTomDrum = document.getElementById('Tom-Right-Drum');
    const smallTomAudio = document.getElementById('Small-Rack-Tom-Audio');
    // right tom drum wobble
    const rightTomtl = new TimelineMax({
      paused: true
    });
    rightTomtl.to(rightTomDrum, 0.1, {scaleX: 1.04, transformOrigin: '50% 50%', ease: Expo.easeOut})
      .to(rightTomDrum, 0.1, {scaleY: 0.95, transformOrigin: '50% 50%', ease: Expo.easeOut}, '0')
      .to(rightTomDrumAll, 0.1, {rotation: 2.5, transformOrigin: '0 50%', ease: Elastic.easeOut}, '0')
      .to(rightTomDrum, 0.4, {scale: 1, transformOrigin: '50% 50%', ease: Elastic.easeOut})
      .to(rightTomDrumAll, 0.6, {rotation: 0, transformOrigin: '0 50%', ease: Elastic.easeOut}, '-=0.4');

    // right tom stuff
    rightTomtl.restart();
    rightTomtl.play();

    // right tom audio
    // @ts-ignore
    smallTomAudio.currentTime = 0;
    // @ts-ignore
    smallTomAudio.play();
  }

  private snareDrum() {
    // snare drum varibles
    // tslint:disable-next-line:no-shadowed-variable
    const snareDrum = document.getElementById('Snare-Drum');
    const snareAudio = document.getElementById('Snare-Audio');
    // snare drum wobble
    const snaretl = new TimelineMax({
      paused: true
    });
    snaretl.to(snareDrum, 0.1, {scaleX: 1.04, transformOrigin: '50% 50%', ease: Expo.easeOut})
      .to(snareDrum, 0.1, {scaleY: 0.9, transformOrigin: '50% 100%', ease: Expo.easeOut}, '0')
      .to(snareDrum, 0.4, {scale: 1, transformOrigin: '50% 100%', ease: Elastic.easeOut});

    // snare tl stuff
    snaretl.restart();
    snaretl.play();
    // snare audio
    // @ts-ignore
    snareAudio.currentTime = 0;
    // @ts-ignore
    snareAudio.play();
  }

  public activateClownHorn() {
    const hornAudio = document.getElementById('Clown-Horn-Audio');
    // @ts-ignore
    hornAudio.currentTime = 0;
    // @ts-ignore
    hornAudio.volume = 0.5;
    // @ts-ignore
    hornAudio.play();
  }

  public activateSong(): void {
    const actionable = document.getElementById('actionable');
    // @ts-ignore
    actionable.currentTime = 2.5;
    // @ts-ignore
    actionable.volume = 0.3;
    // @ts-ignore
    actionable.play();
  }
}
