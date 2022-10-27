import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should be 4", () => {
    expect(2 + 2).toEqual(4);
  })

  describe("getAll", () => {
    it("should return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })
  })

  describe("getOne", () => {
    it("should return an movie", () => {
      service.create({
        title: "Test Movie",
        genres: ['test'],
        year: 2000,
      })
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    })

    it("should throw a NotFoundException", () => {
      try {
        service.getOne(999);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual("Movie with ID 999 not found.")
      }
    })
  })

  describe("createOne", () => {
    it("should create a movie", () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: "Test Movie",
        genres: ['test'],
        year: 2000,
      })
      const afterCreate = service.getAll().length;

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    })
  })

  describe("deleteOne", () => {
    it("delete a movie", () => {
      service.create({
        title: "Test Movie",
        genres: ['test'],
        year: 2000,
      })
      const beforeDelete = service.getAll();
      service.deleteOne(1)
      const afterDelete = service.getAll();

      expect(afterDelete.length).toBeLessThan(beforeDelete.length);
    })
    it("should throw a NotFoundException", () => {
      try {
        service.deleteOne(999);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual("Movie with ID 999 not found.")
      }
    })
  })

  describe("updateOne", () => {
    it("should update a movie", () => {
      service.create({
        title: "Test Movie",
        genres: ['test'],
        year: 2000,
      })
      service.update(1, {
        title: "Updated Test"
      })
      const movie = service.getOne(1);
      expect(movie.title).toEqual("Updated Test");
    })
    it("should throw a NotFoundException", () => {
      try {
        service.update(999, {});
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual("Movie with ID 999 not found.")
      }
    })
  })
});
