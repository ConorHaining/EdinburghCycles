/* eslint-disable no-unused-expressions */
import { expect } from '@open-wc/testing';

import '../src/services/journey-planner';

describe('Journey Planner', () => {
  describe('fetchStationInformation', () => {
    it('should fetch station information and keep it in localStorage if not already present', () => {
      expect(true).to.be.false;
    });

    it('should fetch station information from localStorage if present and in date', () => {
      expect(true).to.be.false;
    });

    it('should update station information and keep it in localStorage if over a week old', () => {
      expect(true).to.be.false;
    });
  });

  describe('findNearestStation', () => {
    it('should return the closest geographical station with >0 bike availability', () => {});
  });
});
