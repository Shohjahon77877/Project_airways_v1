import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RmqErrorHandler} from '@my-airways/shared-utils';
import {
  ADMIN_SERVICE_RABBITMQ,
  USER_SERVICE_RABBITMQ,
  FLIGHT_SERVICE_RABBITMQ,
  NEWS_SERVICE_RABBITMQ,
  DB_SERVICE_RABBITMQ,
  AUTH_SERVICE_RABBITMQ,
  TICKET_SERVICE_RABBITMQ,
  LOYALTY_SERVICE_RABBITMQ,
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
  CreateLoyaltyProgramDto,
  UpdateLoyaltyProgramDto,
  CreateTicketDto,
  UpdateTicketDto,
} from '@my-airways/shared-dto-v2';

@Injectable()
export class AppService {
  constructor(
    @Inject(ADMIN_SERVICE_RABBITMQ) private readonly adminRMQClient: ClientProxy,
    @Inject(USER_SERVICE_RABBITMQ) private readonly userRMQClient: ClientProxy,
    @Inject(FLIGHT_SERVICE_RABBITMQ) private readonly flightRMQClient: ClientProxy,
    @Inject(NEWS_SERVICE_RABBITMQ) private readonly newsRMQClient: ClientProxy,
    @Inject(DB_SERVICE_RABBITMQ) private readonly dbRMQClient: ClientProxy,
    @Inject(AUTH_SERVICE_RABBITMQ) private readonly authRMQClient: ClientProxy,
    @Inject(LOYALTY_SERVICE_RABBITMQ) private readonly loyaltyRMQClient: ClientProxy,
    @Inject(TICKET_SERVICE_RABBITMQ) private readonly ticketRMQClient: ClientProxy,
  ) {}

  // ====================================================
  // ==================== AUTH ==========================
  // ====================================================
  @RmqErrorHandler()
  async loginAdmin(credentials: { input_email: string; password: string }) {
    return await firstValueFrom(
      this.authRMQClient.send({ cmd: 'admin_login' }, credentials),
    );
  }

  @RmqErrorHandler()
  async loginUser(credentials: { input_email: string; password: string }) {
    return await firstValueFrom(
      this.authRMQClient.send({ cmd: 'user_login' }, credentials),
    );
  }

  @RmqErrorHandler()
  async registerUser(user: CreateUserDto) {
    return await firstValueFrom(
      this.authRMQClient.send({ cmd: 'user_register' }, user),
    );
  }

  @RmqErrorHandler()
  async refreshToken(userId: number) {
    return await firstValueFrom(
      this.authRMQClient.send({ cmd: 'refresh_token' }, { userId }),
    );
  }

  @RmqErrorHandler()
  async logout(userId: number) {
    return await firstValueFrom(
      this.authRMQClient.send({ cmd: 'logout' }, { userId }),
    );
  }

  // ====================================================
  // ==================== ADMINS ========================
  // ====================================================
  @RmqErrorHandler()
  async getAdmins() {
    return await firstValueFrom(
      this.adminRMQClient.send({ cmd: 'get_admins' }, {}),
    );
  }

  @RmqErrorHandler()
  async getAdminById(id: number) {
    return await firstValueFrom(
      this.adminRMQClient.send({ cmd: 'get_admin_by_id' }, id),
    );
  }

  @RmqErrorHandler()
  async createAdmin(admin: CreateAdminDto) {
    return await firstValueFrom(
      this.adminRMQClient.send({ cmd: 'create_admin' }, admin),
    );
  }

  @RmqErrorHandler()
  async updateAdmin(id: number, admin: UpdateAdminDto) {
    return await firstValueFrom(
      this.adminRMQClient.send({ cmd: 'update_admin' }, { id, admin }),
    );
  }

  @RmqErrorHandler()
  async deleteAdmin(id: number) {
    return await firstValueFrom(
      this.adminRMQClient.send({ cmd: 'delete_admin' }, id),
    );
  }
  // ====================================================
  // ==================== USERS =========================
  // ====================================================

  @RmqErrorHandler()
  async getUsers() {
    return await firstValueFrom(
      this.userRMQClient.send({ cmd: 'get_users' }, {}),
    );
  }

  @RmqErrorHandler()
  async getUserById(id: number) {
    return await firstValueFrom(
      this.userRMQClient.send({ cmd: 'get_user_by_id' }, id),
    );
  }

  @RmqErrorHandler()
  async createUser(User: CreateUserDto) {
    return await firstValueFrom(
      this.userRMQClient.send({ cmd: 'create_user' }, User),
    );
  }

  @RmqErrorHandler()
  async updateUser(id: number, User: UpdateUserDto) {
    return await firstValueFrom(
      this.userRMQClient.send({ cmd: 'update_user' }, { id, User }),
    );
  }

  @RmqErrorHandler()
  async deleteUser(id: number) {
    return await firstValueFrom(
      this.userRMQClient.send({ cmd: 'delete_user' }, id),
    );
  }

  // ====================================================
  // ==================== FLIGHTS =======================
  // ====================================================
  @RmqErrorHandler()
  async getFlights() {
    return await firstValueFrom(
      this.flightRMQClient.send({ cmd: 'get_flights' }, {}),
    );
  }

  @RmqErrorHandler()
  async getFlightById(id: number) {
    return await firstValueFrom(
      this.flightRMQClient.send({ cmd: 'get_flight_by_id' }, id),
    );
  }

  @RmqErrorHandler()
  async createFlight(flight: CreateFlightDto) {
    return await firstValueFrom(
      this.flightRMQClient.send({ cmd: 'create_flight' }, flight),
    );
  }

  @RmqErrorHandler()
  async updateFlight(id: number, flight: UpdateFlightDto) {
    return await firstValueFrom(
      this.flightRMQClient.send({ cmd: 'update_flight' }, { id, flight }),
    );
  }

  @RmqErrorHandler()
  async deleteFlight(id: number) {
    return await firstValueFrom(
      this.flightRMQClient.send({ cmd: 'delete_flight' }, id),
    );
  }

  // ====================================================
  // ==================== NEWS ==========================
  // ====================================================
  @RmqErrorHandler()
  async getNews() {
    return await firstValueFrom(
      this.newsRMQClient.send({ cmd: 'get_news' }, {}),
    );
  }

  @RmqErrorHandler()
  async getNewsById(id: number) {
    return await firstValueFrom(
      this.newsRMQClient.send({ cmd: 'get_news_by_id' }, id),
    );
  }

  @RmqErrorHandler()
  async createNews(news: CreateNewsDto) {
    return await firstValueFrom(
      this.newsRMQClient.send({ cmd: 'create_news' }, news),
    );
  }

  @RmqErrorHandler()
  async updateNews(id: number, news: UpdateNewsDto) {
    return await firstValueFrom(
      this.newsRMQClient.send({ cmd: 'update_news' }, { id, news }),
    );
  }

  @RmqErrorHandler()
  async deleteNews(id: number) {
    return await firstValueFrom(
      this.newsRMQClient.send({ cmd: 'delete_news' }, id),
    );
  }

  // ====================================================
  // ==================== TICKETS =======================
  // ====================================================
  @RmqErrorHandler()
  async getTickets() {
    return await firstValueFrom(
      this.ticketRMQClient.send({ cmd: 'get_tickets' }, {}),
    );
  }

  @RmqErrorHandler()
  async getTicketById(id: number) {
    return await firstValueFrom(
      this.ticketRMQClient.send({ cmd: 'get_ticket_by_id' }, id),
    );
  }

  @RmqErrorHandler()
  async createTicket(ticket: CreateTicketDto) {
    return await firstValueFrom(
      this.ticketRMQClient.send({ cmd: 'create_ticket' }, ticket),
    );
  }

  @RmqErrorHandler()
  async updateTicket(id: number, ticket: UpdateTicketDto) {
    return await firstValueFrom(
      this.ticketRMQClient.send({ cmd: 'update_ticket' }, { id, ticket }),
    );
  }

  @RmqErrorHandler()
  async deleteTicket(id: number) {
    return await firstValueFrom(
      this.ticketRMQClient.send({ cmd: 'delete_ticket' }, id),
    );
  }

  // ====================================================
  // =============== LOYALTY PROGRAM ====================
  // ====================================================
  @RmqErrorHandler()
  async getMembers() {
    return await firstValueFrom(
      this.loyaltyRMQClient.send({ cmd: 'get_loyalty_members' }, {}),
    );
  }

  @RmqErrorHandler()
  async getMemberById(id: number) {
    return await firstValueFrom(
      this.loyaltyRMQClient.send({ cmd: 'get_loyalty_member_by_id' }, id),
    );
  }

  @RmqErrorHandler()
  async enrollMember(data: CreateLoyaltyProgramDto) {
    console.log("This part is running")
    // return await firstValueFrom(
    //   this.loyaltyRMQClient.send({ cmd: 'create_loyalty_member' }, data),
    // );
    try {
    const res = firstValueFrom(
      this.loyaltyRMQClient.send({ cmd: 'create_loyalty_member' }, data)
    );
    return res;
  } catch (err) {
    console.error('❌ Error while sending RMQ message:', err);
    throw new HttpException('Failed to enroll member.', HttpStatus.BAD_GATEWAY);
  }
  }

  @RmqErrorHandler()
  async updatePoints(id: number, data: UpdateLoyaltyProgramDto) {
    return await firstValueFrom(
      this.loyaltyRMQClient.send({ cmd: 'update_loyalty_points' }, { id, ...data }),
    );
  }

  @RmqErrorHandler()
  async deleteMember(id: number) {
    return await firstValueFrom(
      this.loyaltyRMQClient.send({ cmd: 'delete_loyalty_member' }, id),
    );
  }

  // ====================================================
  // ==================== DB QUERIES ====================
  // ====================================================


  // ====================================================
  // ==================== Aiport ========================
  // ====================================================
  @RmqErrorHandler()
  async createAirport(data: CreateAirportDto) {
    return await firstValueFrom(
      this.dbRMQClient.send({ cmd: 'create_airport' }, data),
    );
  }

  @RmqErrorHandler()
  async getAirportById(id: number) {
    return await firstValueFrom(
      this.dbRMQClient.send({ cmd: 'get_airport_by_id' }, id),
    );
  }

  @RmqErrorHandler()
  async getAirports() {
    return await firstValueFrom(
      this.dbRMQClient.send({ cmd: 'get_airports' }, {}),
    );
  }

  @RmqErrorHandler()
  async updateAirport(id: number, data: UpdateAirportDto) {
    return await firstValueFrom(
      this.dbRMQClient.send({ cmd: 'update_airport' }, { id, data }),
    );
  }

  @RmqErrorHandler()
  async deleteAirport(id: number) {
    return await firstValueFrom(
      this.dbRMQClient.send({ cmd: 'delete_airport' }, id),
    );
  }


  // ====================================================
  // ==================== CITY ==========================
  // ====================================================
  @RmqErrorHandler()
  async createCity(data: CreateCityDto) {
    return await firstValueFrom(this.dbRMQClient.send({ cmd: 'create_city' }, data));
  }

  @RmqErrorHandler()
  async getCityById(id: number) {
    return await firstValueFrom(this.dbRMQClient.send({ cmd: 'get_city_by_id' }, id));
  }

  @RmqErrorHandler()
  async getCities() {
    return await firstValueFrom(this.dbRMQClient.send({ cmd: 'get_cities' }, {}));
  }

  @RmqErrorHandler()
  async updateCity(id: number, data: UpdateCityDto) {
    return await firstValueFrom(
      this.dbRMQClient.send({ cmd: 'update_city' }, { id, data }),
    );
  }

  @RmqErrorHandler()
  async deleteCity(id: number) {
    return await firstValueFrom(this.dbRMQClient.send({ cmd: 'delete_city' }, id));
  }

  // ====================================================
  // ==================== COUNTRY =======================
  // ====================================================

  @RmqErrorHandler()
  async createCountry(data: CreateCountryDto) {
    return await firstValueFrom(
      this.dbRMQClient.send({ cmd: 'create_country' }, data),
    );
  }

  @RmqErrorHandler()
  async getCountryById(id: number) {
    return await firstValueFrom(
      this.dbRMQClient.send({ cmd: 'get_country_by_id' }, id),
    );
  }

  @RmqErrorHandler()
  async getCountries() {
    return await firstValueFrom(this.dbRMQClient.send({ cmd: 'get_countries' }, {}));
  }

  @RmqErrorHandler()
  async updateCountry(id: number, data: UpdateCountryDto) {
    return await firstValueFrom(
      this.dbRMQClient.send({ cmd: 'update_country' }, { id, data }),
    );
  }

  @RmqErrorHandler()
  async deleteCountry(id: number) {
    return await firstValueFrom(this.dbRMQClient.send({ cmd: 'delete_country' }, id));
  }

  // ====================================================
  // ==================== COMPANY =======================
  // ====================================================

  @RmqErrorHandler()
  async createCompany(data: CreateCompanyDto) {
    return await firstValueFrom(
      this.dbRMQClient.send({ cmd: 'create_company' }, data),
    );
  }

  @RmqErrorHandler()
  async getCompanyById(id: number) {
    return await firstValueFrom(
      this.dbRMQClient.send({ cmd: 'get_company_by_id' }, id),
    );
  }

  @RmqErrorHandler()
  async getCompanies() {
    return await firstValueFrom(this.dbRMQClient.send({ cmd: 'get_companies' }, {}));
  }

  @RmqErrorHandler()
  async updateCompany(id: number, data: UpdateCompanyDto) {
    return await firstValueFrom(
      this.dbRMQClient.send({ cmd: 'update_company' }, { id, data }),
    );
  }

  @RmqErrorHandler()
  async deleteCompany(id: number) {
    return await firstValueFrom(this.dbRMQClient.send({ cmd: 'delete_company' }, id));
  }

  // ====================================================
  // ==================== PLANES ========================
  // ====================================================

  @RmqErrorHandler()
  async createPlane(data: CreatePlaneDto) {
    return await firstValueFrom(this.dbRMQClient.send({ cmd: 'create_plane' }, data));
  }

  @RmqErrorHandler()
  async getPlaneById(id: number) {
    return await firstValueFrom(
      this.dbRMQClient.send({ cmd: 'get_plane_by_id' }, id),
    );
  }

  @RmqErrorHandler()
  async getPlanes() {
    return await firstValueFrom(this.dbRMQClient.send({ cmd: 'get_planes' }, {}));
  }

  @RmqErrorHandler()
  async updatePlane(id: number, data: UpdatePlaneDto) {
    return await firstValueFrom(
      this.dbRMQClient.send({ cmd: 'update_plane' }, { id, data }),
    );
  }

  @RmqErrorHandler()
  async deletePlane(id: number) {
    return await firstValueFrom(this.dbRMQClient.send({ cmd: 'delete_plane' }, id));
  }

  // ====================================================
  // ==================== CLASSES =======================
  // ====================================================

  @RmqErrorHandler()
  async createClass(data: CreateClassDto) {
    return await firstValueFrom(this.dbRMQClient.send({ cmd: 'create_class' }, data));
  }

  @RmqErrorHandler()
  async getClassById(id: number) {
    return await firstValueFrom(
      this.dbRMQClient.send({ cmd: 'get_class_by_id' }, id),
    );
  }

  @RmqErrorHandler()
  async getClasses() {
    return await firstValueFrom(this.dbRMQClient.send({ cmd: 'get_classes' }, {}));
  }

  @RmqErrorHandler()
  async updateClass(id: number, data: UpdateClassDto) {
    return await firstValueFrom(
      this.dbRMQClient.send({ cmd: 'update_class' }, { id, data }),
    );
  }

  @RmqErrorHandler()
  async deleteClass(id: number) {
    return await firstValueFrom(this.dbRMQClient.send({ cmd: 'delete_class' }, id));
  }

  // ====================================================
  // ==================== SEATS =========================
  // ====================================================
  
  @RmqErrorHandler()
  async createSeat(data: CreateSeatDto) {
    return await firstValueFrom(this.dbRMQClient.send({ cmd: 'create_seat' }, data));
  }

  @RmqErrorHandler()
  async getSeatById(id: number) {
    return await firstValueFrom(this.dbRMQClient.send({ cmd: 'get_seat_by_id' }, id));
  }
  
  @RmqErrorHandler()
  async getSeats() {
    return await firstValueFrom(this.dbRMQClient.send({ cmd: 'get_seats' }, {}));
  }

  @RmqErrorHandler()
  async updateSeat(id: number, data: UpdateSeatDto) {
    return await firstValueFrom(
      this.dbRMQClient.send({ cmd: 'update_seat' }, { id, data }),
    );
  }

  @RmqErrorHandler()
  async deleteSeat(id: number) {
    return await firstValueFrom(this.dbRMQClient.send({ cmd: 'delete_seat' }, id));
  }
}
