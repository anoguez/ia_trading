import { Test, TestingModule } from "@nestjs/testing";
import { ConfigService } from "./config.service";

describe("ConfigService", () => {
  let service: ConfigService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();
    service = module.get<ConfigService>(ConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should get an env variable as string", async () => {
    process.env.APP_TEST_VAR = "hello world";
    expect(service.getAsString("APP_TEST_VAR")).toBe("hello world");
  });

  it("should throw an error if reading a string as if it was an int", async () => {
    let err;
    try {
      service.getAsInt("APP_TEST_VAR");
    } catch (e) {
      err = e;
    }
    expect(err).toBeDefined();
    expect(err.message).toBe('Env variable with name "APP_TEST_VAR" is not a valid number.');
  });
});
