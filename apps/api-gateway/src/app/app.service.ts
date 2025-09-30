import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  ADMIN_SERVICE_RABBITMQ,
  FLIGHT_SERVICE_RABBITMQ,
  NEWS_SERVICE_RABBITMQ,
  DB_SERVICE_RABBITMQ,
  AUTH_SERVICE_RABBITMQ,
} from '@my-airways/shared-services-v2';
import {
  CreateAdminDto,
  UpdateAdminDto,
  CreateNewsDto,
  UpdateNewsDto,
  CreateFlightDto,
  UpdateFlightDto,
  CreateAirportDto,
  UpdateAirportDto,
  CreateCityDto,
  UpdateCityDto,
  CreateCountryDto,
  UpdateCountryDto,
  CreateCompanyDto,
  UpdateCompanyDto,
  CreatePlaneDto,
  UpdatePlaneDto,
  CreateClassDto,
  UpdateClassDto,
  CreateSeatDto,
  UpdateSeatDto,
  CreateUserDto,
  UpdateUserDto,
} from '@my-airways/shared-dto-v2';

@Injectable()
export class AppService {
  constructor(
    @Inject(ADMIN_SERVICE_RABBITMQ)
    private readonly adminRMQClient: ClientProxy,
    @Inject(FLIGHT_SERVICE_RABBITMQ)
    private readonly flightRMQClient: ClientProxy,
    @Inject(NEWS_SERVICE_RABBITMQ) private readonly newsRMQClient: ClientProxy,
    @Inject(DB_SERVICE_RABBITMQ) private readonly dbRMQClient: ClientProxy,
    @Inject(AUTH_SERVICE_RABBITMQ) private readonly authRMQClient: ClientProxy,
  ) {}

  //----Auth----------------------------------------------------------------------------
  async loginAdmin(credentials: { input_email: string; password: string }) {
    return firstValueFrom(
      this.authRMQClient.send({ cmd: 'admin_login' }, credentials),
    );
  }

  async loginUser(credentials: { input_email: string; password: string }) {
    return firstValueFrom(
      this.authRMQClient.send({ cmd: 'user_login' }, credentials),
    );
  }

  async registerUser(user: CreateUserDto) {
    return firstValueFrom(
      this.authRMQClient.send({ cmd: 'user_register' }, user),
    );
  }

  async refreshToken(userId: number) {
    return firstValueFrom(
      this.authRMQClient.send({ cmd: 'refresh_token' }, { userId }),
    );
  }

  async logout(userId: number) {
    return firstValueFrom(
      this.authRMQClient.send({ cmd: 'logout' }, { userId }),
    );
  }

  //----Admins--------------------------------------------------------------------------
  async getAdmins() {
    return firstValueFrom(this.adminRMQClient.send({ cmd: 'get_admins' }, {}));
  }

  async getAdminById(id: number) {
    return firstValueFrom(
      this.adminRMQClient.send({ cmd: 'get_admin_by_id' }, id),
    );
  }

  async createAdmin(admin: CreateAdminDto) {
    return firstValueFrom(
      this.adminRMQClient.send({ cmd: 'create_admin' }, admin),
    );
  }

  async updateAdmin(id: number, admin: UpdateAdminDto) {
    return firstValueFrom(
      this.adminRMQClient.send({ cmd: 'update_admin' }, { id, admin }),
    );
  }

  async deleteAdmin(id: number) {
    return firstValueFrom(
      this.adminRMQClient.send({ cmd: 'delete_admin' }, id),
    );
  }

  //----Flights--------------------------------------------------------------------------
  async getFlights() {
    return firstValueFrom(
      this.flightRMQClient.send({ cmd: 'get_flights' }, {}),
    );
  }

  async getFlightById(id: number) {
    return firstValueFrom(
      this.flightRMQClient.send({ cmd: 'get_flight_by_id' }, id),
    );
  }

  async createFlight(flight: CreateFlightDto) {
    return firstValueFrom(
      this.flightRMQClient.send({ cmd: 'create_flight' }, flight),
    );
  }

  async updateFlight(id: number, flight: UpdateFlightDto) {
    return firstValueFrom(
      this.flightRMQClient.send({ cmd: 'update_flight' }, { id, flight }),
    );
  }

  async deleteFlight(id: number) {
    return firstValueFrom(
      this.flightRMQClient.send({ cmd: 'delete_flight' }, id),
    );
  }

  //----News--------------------------------------------------------------------------
  async getNews() {
    return firstValueFrom(this.newsRMQClient.send({ cmd: 'get_news' }, {}));
  }

  async getNewsById(id: number) {
    return firstValueFrom(
      this.newsRMQClient.send({ cmd: 'get_news_by_id' }, id),
    );
  }

  async createNews(news: CreateNewsDto) {
    return firstValueFrom(
      this.newsRMQClient.send({ cmd: 'create_news' }, news),
    );
  }

  async updateNews(id: number, news: UpdateNewsDto) {
    return firstValueFrom(
      this.newsRMQClient.send({ cmd: 'update_news' }, { id, news }),
    );
  }

  async deleteNews(id: number) {
    return firstValueFrom(this.newsRMQClient.send({ cmd: 'delete_news' }, id));
  }

  // ==================ONLY---DB---QUERIES=========================
  // ---- Airports ------------------------------------------------
  async createAirport(data: CreateAirportDto) {
    return firstValueFrom(
      this.dbRMQClient.send({ cmd: 'create_airport' }, data),
    );
  }
  async getAirportById(id: number) {
    return firstValueFrom(
      this.dbRMQClient.send({ cmd: 'get_airport_by_id' }, id),
    );
  }
  async getAirports() {
    return firstValueFrom(this.dbRMQClient.send({ cmd: 'get_airports' }, {}));
  }
  async updateAirport(id: number, data: UpdateAirportDto) {
    return firstValueFrom(
      this.dbRMQClient.send({ cmd: 'update_airport' }, { id, data }),
    );
  }
  async deleteAirport(id: number) {
    return firstValueFrom(this.dbRMQClient.send({ cmd: 'delete_airport' }, id));
  }

  // ---- Cities ------------------------------------------------
  async createCity(data: CreateCityDto) {
    return firstValueFrom(this.dbRMQClient.send({ cmd: 'create_city' }, data));
  }
  async getCityById(id: number) {
    return firstValueFrom(this.dbRMQClient.send({ cmd: 'get_city_by_id' }, id));
  }
  async getCities() {
    return firstValueFrom(this.dbRMQClient.send({ cmd: 'get_cities' }, {}));
  }
  async updateCity(id: number, data: UpdateCityDto) {
    return firstValueFrom(
      this.dbRMQClient.send({ cmd: 'update_city' }, { id, data }),
    );
  }
  async deleteCity(id: number) {
    return firstValueFrom(this.dbRMQClient.send({ cmd: 'delete_city' }, id));
  }

  // ---- Countries ------------------------------------------------
  async createCountry(data: CreateCountryDto) {
    return firstValueFrom(
      this.dbRMQClient.send({ cmd: 'create_country' }, data),
    );
  }
  async getCountryById(id: number) {
    return firstValueFrom(
      this.dbRMQClient.send({ cmd: 'get_country_by_id' }, id),
    );
  }
  async getCountries() {
    return firstValueFrom(this.dbRMQClient.send({ cmd: 'get_countries' }, {}));
  }
  async updateCountry(id: number, data: UpdateCountryDto) {
    return firstValueFrom(
      this.dbRMQClient.send({ cmd: 'update_country' }, { id, data }),
    );
  }
  async deleteCountry(id: number) {
    return firstValueFrom(this.dbRMQClient.send({ cmd: 'delete_country' }, id));
  }

  // ---- Companies ------------------------------------------------
  async createCompany(data: CreateCompanyDto) {
    return firstValueFrom(
      this.dbRMQClient.send({ cmd: 'create_company' }, data),
    );
  }
  async getCompanyById(id: number) {
    return firstValueFrom(
      this.dbRMQClient.send({ cmd: 'get_company_by_id' }, id),
    );
  }
  async getCompanies() {
    return firstValueFrom(this.dbRMQClient.send({ cmd: 'get_companies' }, {}));
  }
  async updateCompany(id: number, data: UpdateCompanyDto) {
    return firstValueFrom(
      this.dbRMQClient.send({ cmd: 'update_company' }, { id, data }),
    );
  }
  async deleteCompany(id: number) {
    return firstValueFrom(this.dbRMQClient.send({ cmd: 'delete_company' }, id));
  }

  // ---- Planes ------------------------------------------------
  async createPlane(data: CreatePlaneDto) {
    return firstValueFrom(this.dbRMQClient.send({ cmd: 'create_plane' }, data));
  }
  async getPlaneById(id: number) {
    return firstValueFrom(
      this.dbRMQClient.send({ cmd: 'get_plane_by_id' }, id),
    );
  }
  async getPlanes() {
    return firstValueFrom(this.dbRMQClient.send({ cmd: 'get_planes' }, {}));
  }
  async updatePlane(id: number, data: UpdatePlaneDto) {
    return firstValueFrom(
      this.dbRMQClient.send({ cmd: 'update_plane' }, { id, data }),
    );
  }
  async deletePlane(id: number) {
    return firstValueFrom(this.dbRMQClient.send({ cmd: 'delete_plane' }, id));
  }

  // ---- Classes ------------------------------------------------
  async createClass(data: CreateClassDto) {
    return firstValueFrom(this.dbRMQClient.send({ cmd: 'create_class' }, data));
  }
  async getClassById(id: number) {
    return firstValueFrom(
      this.dbRMQClient.send({ cmd: 'get_class_by_id' }, id),
    );
  }
  async getClasses() {
    return firstValueFrom(this.dbRMQClient.send({ cmd: 'get_classes' }, {}));
  }
  async updateClass(id: number, data: UpdateClassDto) {
    return firstValueFrom(
      this.dbRMQClient.send({ cmd: 'update_class' }, { id, data }),
    );
  }
  async deleteClass(id: number) {
    return firstValueFrom(this.dbRMQClient.send({ cmd: 'delete_class' }, id));
  }

  // ---- Seats ------------------------------------------------
  async createSeat(data: CreateSeatDto) {
    return firstValueFrom(this.dbRMQClient.send({ cmd: 'create_seat' }, data));
  }
  async getSeatById(id: number) {
    return firstValueFrom(this.dbRMQClient.send({ cmd: 'get_seat_by_id' }, id));
  }
  async getSeats() {
    return firstValueFrom(this.dbRMQClient.send({ cmd: 'get_seats' }, {}));
  }
  async updateSeat(id: number, data: UpdateSeatDto) {
    return firstValueFrom(
      this.dbRMQClient.send({ cmd: 'update_seat' }, { id, data }),
    );
  }
  async deleteSeat(id: number) {
    return firstValueFrom(this.dbRMQClient.send({ cmd: 'delete_seat' }, id));
  }
}
