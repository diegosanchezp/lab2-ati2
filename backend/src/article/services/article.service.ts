import { Injectable, UnauthorizedException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { AppLogger } from '../../shared/logger/logger.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import {
  CreateArticleInput,
  UpdateArticleInput,
} from '../dtos/article-input.dto';
import { ArticleOutput } from '../dtos/article-output.dto';
import { Article } from '../entities/article.entity';
import { ArticleRepository } from '../repositories/article.repository';

@Injectable()
export class ArticleService {
  constructor(
    private repository: ArticleRepository,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(ArticleService.name);
  }

  async createArticle(
    ctx: RequestContext,
    input: CreateArticleInput,
  ): Promise<ArticleOutput> {
    this.logger.log(ctx, `${this.createArticle.name} was called`);

    const article = plainToClass(Article, input);

    this.logger.log(ctx, `calling ${ArticleRepository.name}.save`);
    const savedArticle = await this.repository.save(article);

    return plainToClass(ArticleOutput, savedArticle, {
      excludeExtraneousValues: true,
    });
  }

  async getArticles(
    ctx: RequestContext,
    limit: number,
    offset: number,
  ): Promise<{ articles: ArticleOutput[]; count: number }> {
    this.logger.log(ctx, `${this.getArticles.name} was called`);

    this.logger.log(ctx, `calling ${ArticleRepository.name}.findAndCount`);
    const [articles, count] = await this.repository.findAndCount({
      where: {},
      take: limit,
      skip: offset,
    });

    const articlesOutput = plainToClass(ArticleOutput, articles, {
      excludeExtraneousValues: true,
    });

    return { articles: articlesOutput, count };
  }

  async getArticleById(
    ctx: RequestContext,
    id: number,
  ): Promise<ArticleOutput> {
    this.logger.log(ctx, `${this.getArticleById.name} was called`);

    const article = await this.repository.getById(id);

    return plainToClass(ArticleOutput, article, {
      excludeExtraneousValues: true,
    });
  }

  async updateArticle(
    ctx: RequestContext,
    articleId: number,
    input: UpdateArticleInput,
  ): Promise<ArticleOutput> {
    this.logger.log(ctx, `${this.updateArticle.name} was called`);

    this.logger.log(ctx, `calling ${ArticleRepository.name}.getById`);
    const article = await this.repository.getById(articleId);

    const updatedArticle: Article = {
      ...article,
      ...plainToClass(Article, input),
    };

    this.logger.log(ctx, `calling ${ArticleRepository.name}.save`);
    const savedArticle = await this.repository.save(updatedArticle);

    return plainToClass(ArticleOutput, savedArticle, {
      excludeExtraneousValues: true,
    });
  }

  async deleteArticle(ctx: RequestContext, id: number): Promise<void> {
    this.logger.log(ctx, `${this.deleteArticle.name} was called`);

    this.logger.log(ctx, `calling ${ArticleRepository.name}.getById`);
    const article = await this.repository.getById(id);

    this.logger.log(ctx, `calling ${ArticleRepository.name}.remove`);
    await this.repository.remove(article);
  }
}
